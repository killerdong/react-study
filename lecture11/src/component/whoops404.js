import React from 'react';
import PageTemplate from './pageTemplate';

export default ({location}) => <PageTemplate><section className="whoops-404"><h1>'{location.pathname}' 경로의 지원을 찾을 수 없습니다.</h1></section></PageTemplate>;