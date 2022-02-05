import React from 'react';

import { Card, Icon, Label, Image, Button, Container } from 'semantic-ui-react';
// import moment from 'moment'

// COMPONENTS ===============================================================
import '../styles/styles.css';
// PICTURES =================================================================
import Face from '../assets/images/face.jpg';

// AUTH =====================================================================
// import Auth from '../utils/auth';

const items = [
    {
        header: 'Project Report - April',
        description:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
        meta: 'ROI: 30%',
    },
    {
        header: 'Project Report - May',
        description:
            'Bring to the table win-win survival strategies to ensure proactive domination.',
        meta: 'ROI: 34%',
    },
]

// const CardExampleGroupCentered = () => <Card.Group centered items={items} />


function HomeArticleCards() {
    return (
        <>
            <h1 className='text-center'>Featured Articles</h1>

            <div class="ui centered cards">
            <div class="ui card">
                    <div class="content">
                        <div class="header">Project Report - April</div>
                        <div class="meta">ROI: 30%</div>
                        <div class="description">Leverage agile frameworks to provide a robust synopsis for high level overviews.</div>
                    </div>
                </div>
                <div class="ui card">
                    <div class="content">
                        <div class="header">Project Report - April</div>
                        <div class="meta">ROI: 30%</div>
                        <div class="description">Leverage agile frameworks to provide a robust synopsis for high level overviews.</div>
                    </div>
                </div>
                <div class="ui card">
                    <div class="content">
                        <div class="header">Project Report - May</div>
                        <div class="meta">ROI: 34%</div>
                        <div class="description">Bring to the table win-win survival strategies to ensure proactive domination.</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeArticleCards;