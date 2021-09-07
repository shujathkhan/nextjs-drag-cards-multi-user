# nextjs-drag-cards-multi-user

This is a prototype of a collaborative draggable card experience, works only in Edge chromium and Firefox for now. Created using NextJS, react-beautiful-dnd, MSW, PubNub and Docker.

## Getting Started

To run the cloned application, run the development server:

```bash
npm i && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture and approach

This is a proof of concept built to understand collaboration, draggability and developing mock services using [mswjs](https://mswjs.io/). For developing this PoC I used, NextJS as my frontend framework, this helped me in reducing my development time, as the frontend tooling was pre-built in its template. Though it did reduce most of my development time, it did not offer the kind of flexibility I needed for integrating mswjs and DnD(Drag and drop). In my initial stages I encountered many issues with respect ot setting up mswjs.

The reason I chose to go with MSWjs, is because, it is a new framework I wanted to test its limits, and that it truly mocks the http requests unlike other popular libraries like axios-mock-adapter and miragejs.

MSWjs does not work in NextJS without its node server running, and to top it all, it does not work in chrome at all. The mockServiceWorker kept hitting an infinite render loop, because of a nextjs support for node serviceWorker in Chrome. It works fine in Edge chromium and Firefox. In firefox I encountered another issue, mswjs supports only fetch api in firefox, it does not support axios. This is an [existing issue](https://github.com/mswjs/msw/issues/220) in mswjs.

The Drag and drop of cards, was a bit complicated as NextJS has a separate DOM structure. For that I had to hook it up with it `_document.tsx` use that to render the react-beautiful-dnd changes. The event used in hooking up the drag and drop is the onDragEnd, where I am using the source and target index position to swap positions. I wanted to use dragula for the drag and drop, as it provides real and shadow DOM manipulation, react-beautiful-dnd seemed to accomplish what I needed and it seemed straightforward.

For the mult-user collaboration, I have used pubnub, as its an event driven system, it offer publish and subscribe to a particular channel. Initially, I though of using something like socketio, but pubnub seemed straighforward, and I really like modularism added.

Overall this PoC helped me in gaining insight into the nextjs frontend tooling, how dnd works and event driven systems like pubnub.

## Learn More

- To learn more about [PubNub](https://www.pubnub.com/docs/quickstarts/javascript)
- To learn more about [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- To learn more about [MSWjs](https://mswjs.io/)
- To learn more about Next.js, take a look at the following resources:

  - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
  - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

  You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
