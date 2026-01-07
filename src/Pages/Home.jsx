import React from 'react';
import Carousel from '../Component/HomeComponents/Carousel';
import OurCommunity from '../Component/HomeComponents/OurCommunity';
import GardenTips from '../Component/HomeComponents/GardenTips';
import CommunityStats from '../Component/HomeComponents/CommunityStats';

const Home = () => {
    return (
        <div>
            <Carousel />
            <OurCommunity />
            <GardenTips />
            <CommunityStats />
        </div>
    );
};

export default Home;