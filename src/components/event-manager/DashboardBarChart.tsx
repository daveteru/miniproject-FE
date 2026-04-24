import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    type TooltipContentProps
} from "recharts";
import { formatThousand } from "../../utility/utils";

interface ChartProps {
  data: { month: string; total: number }[];
}

export default function DashboardBarChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value)
          }
        />
        <Tooltip content={CustomTooltip} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (active && payload && payload.length) {
    return (
      <div className="min-w-40 bg-white border border-neutral-200 shadow-md rounded px-4 py-3 grid grid-cols-[1fr_3fr] items-center">
        <p className="text-[12px] font-bold text-left">{label}</p>
        <p className="text-[12px] text-right">
          Rp. {formatThousand(Number(payload[0].value))}
        </p>
      </div>
    );
  }
  return null;
}
