"use client"

import type { ElevationPoint } from "@/lib/trail-data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface ElevationProfileChartProps {
  data: ElevationPoint[] | undefined
}

export function ElevationProfileChart({ data }: ElevationProfileChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        No hay datos de elevación disponibles.
      </div>
    )
  }

  const formatXAxis = (tickItem: number) => {
    return `${(tickItem / 1000).toFixed(1)} km`
  }
  
  const formatYAxis = (tickItem: number) => {
    return `${tickItem} m`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Distancia
              </span>
              <span className="font-bold text-muted-foreground">
                {formatXAxis(label)}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Elevación
              </span>
              <span className="font-bold">
                 {formatYAxis(payload[0].value)}
              </span>
            </div>
          </div>
        </div>
      );
    }
  
    return null;
  };


  return (
    <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
            data={data}
            margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
                dataKey="distance"
                tickFormatter={formatXAxis}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
                tickFormatter={formatYAxis}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsla(var(--accent) / 0.1)'}} />
            <Area
                type="monotone"
                dataKey="elevation"
                stroke="hsl(var(--primary))"
                fill="hsla(var(--primary) / 0.2)"
                strokeWidth={2}
            />
        </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
