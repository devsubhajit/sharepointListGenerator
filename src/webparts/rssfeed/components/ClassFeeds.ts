import { ISPListFeedItem } from "./Ifeed";

export class  ClassFeeds{
   
    public FeedTitle:string;
    public FeedId:string;
    public FeedURL:string;
    public FeedPublished:string;
    public FeedSummery:string;
    constructor(item: ISPListFeedItem) {
      this.FeedTitle = item.Title;
      this.FeedId = item.Feed_x002d_ID;
      this.FeedURL = item.Feed_x002d_PrimaryFeedLink;
      this.FeedPublished=item.Feed_x002d_PublishedOn;
      this.FeedSummery=item.Feed_x002d_Summary;
  }
}