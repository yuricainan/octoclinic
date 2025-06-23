import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const colorClasses = {
  blue: "bg-blue-500",
  green: "bg-green-500", 
  red: "bg-red-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500"
};

export default function StatsCard({ title, value, icon: Icon, color, trend, trendUp }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-2 p-3 lg:p-4">
        <div className="flex items-center justify-between">
          <div className={`p-2 lg:p-3 rounded-xl ${colorClasses[color]} bg-opacity-10`}>
            <Icon className={`w-4 lg:w-6 h-4 lg:h-6 ${colorClasses[color].replace('bg-', 'text-')}`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-green-600' : 'text-red-600'} hidden lg:flex`}>
              {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-xs">{trend}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-3 lg:p-4">
        <div className="space-y-1">
          <p className="text-xs lg:text-sm font-medium text-slate-600">{title}</p>
          <p className="text-lg lg:text-2xl font-bold text-slate-900">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-green-600' : 'text-red-600'} lg:hidden`}>
              {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
