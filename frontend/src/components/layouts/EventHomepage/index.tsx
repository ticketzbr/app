import {Header} from "./Header";
import './styles.scss';
import {EventInformation} from "./EventInformation";
import classes from "./EventHomepage.module.scss";
import {t} from "@lingui/macro";
import {SelectTickets} from "../../routes/ticket-widget/SelectTickets";
import '../../../styles/widget/default.scss';
import React, { Fragment } from "react";
import {useLoaderData, useNavigation, useParams} from "react-router-dom";
import {useGetEventPublic} from "../../../queries/useGetEventPublic.ts";
import {LoadingMask} from "../../common/LoadingMask";
import {EventDocumentHead} from "../../common/EventDocumentHead";
import {HomepageInfoMessage} from "../../common/HomepageInfoMessage";
import {eventCoverImageUrl} from "../../../utilites/urlHelper.ts";
import { Event } from "../../../types.ts";

interface EventHomepageProps {
    colors?: {
        background?: string;
        primary?: string;
        primaryText?: string;
        secondary?: string;
        secondaryText?: string;
    },
    continueButtonText?: string;
}

const EventHomepage = ({colors, continueButtonText}: EventHomepageProps) => {
    const loaderData = useLoaderData()
    const { state } = useNavigation();


    const {event, promoCodeValid} = loaderData as {
        event: Event;
        promoCodeValid: boolean;
    }

    
    // const {eventId} = useParams();
    // const {data: event, isFetched: eventIsFetched, error} = useGetEventPublic(eventId);

    // if (error?.response?.status === 404) {
    //     return <HomepageInfoMessage
    //         message={t`This event is not available.`}
    //     />
    // }



    const styleOverrides = {
        '--homepage-background-color': colors?.background || event?.settings?.homepage_background_color,
        '--homepage-primary-color': colors?.primary || event?.settings?.homepage_primary_color,
        '--homepage-primary-text-color': colors?.primaryText || event?.settings?.homepage_primary_text_color,
        '--homepage-secondary-color': colors?.secondary || event?.settings?.homepage_secondary_color,
        '--homepage-secondary-text-color': colors?.secondaryText || event?.settings?.homepage_secondary_text_color,
    } as React.CSSProperties;

    const coverImage = eventCoverImageUrl(event);

    return (
        <Fragment key={`${event.id}`}>
            {(event) && <EventDocumentHead event={event}/>}
            {coverImage && <div className={classes.background} style={{backgroundImage: `url(${coverImage})`}}/>}
            <div id={'event-homepage'} style={styleOverrides} className={classes.styleContainer}>
                <div className={classes.container}>
                    <Header event={event} />
                    <div className={classes.innerContainer}>
                        <div className={classes.eventInfo}>
                            <EventInformation event={event}/>
                        </div>

                        <div className={classes.ticketContainer}>
                            <h2>{t`Tickets`}</h2>
                            <div className={classes.ticketSelection}>
                                <SelectTickets
                                    colors={{
                                        background: 'var(--homepage-background-color)',
                                        primary: 'var(--homepage-primary-color)',
                                        primaryText: 'var(--homepage-primary-text-color)',
                                        secondary: 'var(--homepage-secondary-color)',
                                        secondaryText: 'var(--homepage-secondary-text-color)',
                                    }}
                                    continueButtonText={continueButtonText}
                                    padding={'0px'} 
                                    event={event}
                                    promoCodeValid={promoCodeValid}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<PoweredByFooter/>*/}
            </div>
        </Fragment>
    );
}

export default EventHomepage;