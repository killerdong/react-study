import React from 'react';
import {Route} from 'react-router-dom';
import PageTemplate from './pageTemplate';
import Company from './company';
import History from './history';
import Services from './services';
import Location from './location';
import AboutMenu from './aboutMenu';
import Bottom from './bottom';

//export default () => <PageTemplate><section className="about"><h1>[회사 소개]</h1></section></PageTemplate>;
export default () => 
    <PageTemplate>
        <section className="about">
            <Route component={AboutMenu} />
            <Route exact path="/about" component={Company} />
            <Route path="/about/history" component={History} />
            <Route path="/about/services" component={Services} />
            <Route path="/about/location" component={Location} />
            <Route component={Bottom} />
        </section>
    </PageTemplate>;