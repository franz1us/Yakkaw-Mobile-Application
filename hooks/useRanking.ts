import { useState, useEffect } from "react";
import { Ranking_type } from "@/constants/Ranking_Data";
import axios from "axios";
import { format } from "date-fns";

const API_URL = "https://yakkaw.mfu.ac.th/api/yakkaw/devices";

const useRanking = () => {
  const [filteredData, setFilteredData] = useState<Ranking_type[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        // console.log("API Response:", response.data);

        if (response.status === 200 && response.data.response) {
          const today = format(new Date(), "yyyy-MM-dd");

          const filteredResults = response.data.response
            .filter((item: any) => {
              const itemDate = item.ddate ? item.ddate : null;
              return (
                item.status === "Active" &&
                item.latitude &&
                item.longitude &&
                item.ddate !== null &&
                item.dtime !== null &&
                item.timestamp !== null &&
                item.av24h !== null &&
                item.av12h !== null &&
                item.av6h !== null &&
                item.av3h !== null &&
                item.av1h !== null &&
                item.pm25 !== null &&
                item.pm10 !== null &&
                item.pm100 !== null &&
                item.aqi !== null &&
                item.temperature !== null &&
                item.humidity !== null &&
                item.pres !== null &&
                item.color !== null &&
                item.trend !== null &&
                itemDate === today // ตรวจสอบว่าเป็นวันที่เดียวกับวันนี้

              );
            })
            .map((item: any) => ({
              pid: item.dvid,
              place: item.place || "Unknown",
              address: item.address ||"Unknown",
              av6h: item.pm25 ?? 0,
              av3h: item.pm25 ?? 0,
              av1h: item.pm25 ?? 0,
              pm25: item.pm25 ?? 0,
              temperature: item.temperature ?? "N/A",
              trend: item.trend || "No Trend",
              date: item.ddate,
              time: format(new Date(`${item.ddate} ${item.dtime}`), "hh:mm a"),
            }));

            const uniqueFilteredResults: Ranking_type[] = Array.from(
              new Map<string, Ranking_type>(filteredResults.map((item: { pid: any; }) => [item.pid, item])).values()
            );
            
            // 🔍 Debugging: Check for duplicate pids
            const duplicatePids = filteredResults
              .map((item: { pid: any; }) => item.pid)
              .filter((pid: any, index: any, array: string | any[]) => array.indexOf(pid) !== index);
  
            if (duplicatePids.length > 0) {
              console.warn("Duplicate pids detected:", duplicatePids);
            }
  
            setFilteredData(uniqueFilteredResults.sort((a, b) => b.pm25 - a.pm25));
          } else {
            setError("Failed to fetch data.");
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Unable to connect to the server.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { filteredData, loading, error };
  };
  
  export default useRanking;

