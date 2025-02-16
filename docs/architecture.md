# Facebook Ad Library Architecture

## System Flow Diagram

```mermaid
graph TD
    %% Client-side components
    Client[Client Browser]
    SearchForm[Search Form Component]
    CategoryFilter[Category Filter Component]
    AdsGrid[Ads Grid Component]
    
    %% Server-side components
    Server[Express Server]
    FBApi[Facebook Ad Library API]
    GeminiAI[Google Gemini AI]
    
    %% Data stores
    SearchHistory[(Search History DB)]
    
    %% Client-side flow
    Client --> |1. User Input| SearchForm
    Client --> |1a. Select Categories| CategoryFilter
    SearchForm & CategoryFilter --> |2. Search Request| Server
    Server --> |9. Filtered Response| AdsGrid
    AdsGrid --> |10. Display| Client
    
    %% Server-side flow
    Server --> |3. Query Ads| FBApi
    FBApi --> |4. Raw Ads Data| Server
    Server --> |5. Store Search| SearchHistory
    Server --> |6. Send Ad Content| GeminiAI
    GeminiAI --> |7. Ad Categories| Server
    
    %% Processing subgraph
    subgraph Server Processing
        ProcessAds[Process Ads] --> |8a. Map Categories|FilterAds[Filter by Categories]
        FilterAds --> |8b. Apply Search Terms|FinalizeResponse[Prepare Response]
    end
    
    %% Data flow details
    classDef api fill:#f9f,stroke:#333,stroke-width:2px
    classDef component fill:#bbf,stroke:#333,stroke-width:2px
    classDef process fill:#bfb,stroke:#333,stroke-width:2px
    classDef storage fill:#fbb,stroke:#333,stroke-width:2px
    
    class FBApi,GeminiAI api
    class SearchForm,CategoryFilter,AdsGrid,Client component
    class ProcessAds,FilterAds,FinalizeResponse process
    class SearchHistory storage
```

## Flow Description

1. **User Interaction**
   - Users enter search terms and select categories in the browser
   - The UI components collect and validate user input

2. **Server Processing**
   - Express server receives search request with terms and categories
   - Queries Facebook Ad Library API for matching ads
   - Stores search history for analytics
   - Uses Gemini AI to categorize the ads
   - Filters ads based on user-selected categories

3. **Response Handling**
   - Filtered and categorized ads are sent back to client
   - AdsGrid component displays the results
   - Users can interact with individual ad cards

## Color Legend
- 🟪 Pink: External APIs (Facebook Ad Library, Gemini AI)
- 🟦 Blue: UI Components
- 🟩 Green: Processing Steps
- 🟥 Red: Data Storage
