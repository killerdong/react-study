import React from 'react';
import PageTemplate from './pageTemplate';

export default ({match}) => <PageTemplate><section className="events"><h1>[이벤트]{match.params.name}{match.params.message}</h1></section></PageTemplate>;