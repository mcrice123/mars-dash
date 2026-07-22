import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import MarsBarChart from '@/components/mars-bar-chart';
import MarsLineChart from '@/components/mars-line-chart';
import * as d3 from 'd3';
    const createTables = async () => {
        let data = await             
        d3.csv(url('static/linechart.json'))
        let parseTime = d3.timeParse("%Y-%m-%d");
        data.forEach((d) => {
            d.date = parseTime(d.date);
            d.close = +d.close;
        });
    }
console.log("LINE DATA");
const lineDataTables = createTables();
console.log(lineDataTables);

const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 80 },
  { name: 'C', value: 45 },
  { name: 'D', value: 60 },
  { name: 'E', value: 20 },
  { name: 'F', value: 90 },
  { name: 'G', value: 50 },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <MarsBarChart 
                            data={data} 
                            width={400} 
                            height={220} 
                            className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" 
                            />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <MarsLineChart
                            data={lineDataTables}
                            width={400}
                            height={220}
                            className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" 
                            />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
