import classes from "./StatBoxes.module.scss";
import {IconCash, IconEye, IconReceipt, IconTicket} from "@tabler/icons-react";
import {Card} from "../Card";
import {useGetEventStats} from "../../../queries/useGetEventStats.ts";
import {useParams} from "react-router-dom";
import {t} from "@lingui/macro";
import {useGetEvent} from "../../../queries/useGetEvent.ts";
import {formatCurrency} from "../../../utilites/currency.ts";

export const StatBoxes = () => {
    const {eventId} = useParams();
    const eventStatsQuery = useGetEventStats(eventId);
    const eventQuery = useGetEvent(eventId);
    const event = eventQuery?.data;
    const {data: eventStats} = eventStatsQuery;

    const data = [
        {
            number: eventStats?.total_tickets_sold,
            description: t`Tickets sold`,
            icon: <IconTicket/>
        },
        {
            number: formatCurrency(eventStats?.total_gross_sales || 0, event?.currency),
            description: t`Gross sales`,
            icon: <IconCash/>
        },
        {
            number: '2,345',
            description: t`Page views`,
            icon: <IconEye/>
        },
        {
            number: eventStats?.total_orders,
            description: t`Orders Created`,
            icon: <IconReceipt/>
        }
    ];

    const stats = data.map((stat) => {
        return (
            <Card className={classes.statistic} key={stat.description}>
                <div className={classes.leftPanel}>
                    <div className={classes.number}>{stat.number}</div>
                    <div className={classes.description}>{stat.description}</div>
                </div>
                <div className={classes.rightPanel}>
                    <div className={classes.icon}>
                        {stat.icon}
                    </div>
                </div>
            </Card>
        )
    })

    return (
        <div className={classes.statistics}>
            {stats}
        </div>
    );
};

