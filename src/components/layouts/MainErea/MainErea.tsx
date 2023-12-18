import React from 'react';
import { MainEreaBody, MainEreaBodyNav, MainEreaHeader } from './';


const MainErea = () => {
    return (
        <section className="main-erea">
            <MainEreaHeader />

            <MainEreaBody />
            <MainEreaBodyNav />
        </section>
    );
};

export default MainErea;
