import * as React from 'react';
import styles from './Rssfeed.module.scss';
import { IRssfeedProps } from './IRssfeedProps';
import { escape } from '@microsoft/sp-lodash-subset';
import RssList from './RssList/RssList';
import pnp from 'sp-pnp-js';
import { ClassFeeds } from './ClassFeeds';
import { ISPListFeedItem } from './Ifeed';
import {Web} from 'sp-pnp-js';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class Rssfeed extends React.Component<IRssfeedProps, any> {
  constructor(props: IRssfeedProps) {
    super(props);
    this.state = {
      rssItems: []
    };
  }


  componentDidMount() {
    this._getFeedListData();
  }
  public render(): React.ReactElement<IRssfeedProps> {
    const { rssItems } = this.state;
    // const listLimit  = this.props.feedlimit;
    let limitNum = Number(this.props.feedlimit);
    return (
      <div className={styles.rssfeed}>
        <h2 className={ styles.heading }>{escape(this.props.description)}</h2>
        <ul>
          {rssItems.slice(0, limitNum).map((items: object, index: number) => (
            <RssList feed={items}></RssList>
          ))}
        </ul>
      </div>
    );
  }

  private _getFeedListData(): void {
    /**
     * If we are not using pnp.sp
     * then we have to import SPHttpClient here and get the context from props
     */
    // console.log('this.context ', this.props.context);
    // this.props.context.spHttpClient.get(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('RssFeedBeforeModeration')/items`, SPHttpClient.configurations.v1)
    // .then((responseListCustomer:any)=>{
    //   console.log('result', responseListCustomer);
    //   });
    // pnp.

    let web = new Web(this.props.context.pageContext.web.absoluteUrl);
    web.lists.getByTitle(`RSSFeedBeforeModeration`).items.get().then
      ((response) => {
        let feedCollections = response.map(item => new ClassFeeds(item));
        this.setState({ rssItems: feedCollections });
      }); 

    // "https://netwovenincdemo.sharepoint.com/sites/DemoIntuitAccouts/_api/web/lists/GetByTitle('RssFeedBeforeModeration')/items"
    // pnp.sp.web.lists.getByTitle(`RssFeedBeforeModeration`).items.get().then
      // ((response) => {
        // console.log('response ', response);
        // let feedCollections = response.map(item => new ClassFeeds(item));
        // this.setState({ rssItems: feedCollections });
      // });
    // https://netwovenincdemo.sharepoint.com/sites/DemoIntuitAccouts/_layouts/15/workbench.aspx
  }
}
