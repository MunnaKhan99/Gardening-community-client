import React from 'react';
import Carousel from '../Component/HomeComponents/Carousel';
import OurCommunity from '../Component/HomeComponents/OurCommunity';
import GardenTips from '../Component/HomeComponents/GardenTips';

const Home = () => {
    return (
        <div>
            <Carousel />
            <OurCommunity />
            <GardenTips />
            
        </div>
    );
};

export default Home;