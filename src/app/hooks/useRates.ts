import { useQuery } from "@tanstack/react-query";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { Dayjs } from "dayjs";
import { fetcher } from "../utils/fetcher";

export const useRates = (value: DateRange<Dayjs>) => {
  return useQuery({
    queryKey: ["fetchRates", value],
    queryFn: () =>
      fetcher(value[0]!.format("YYYY-MM-DD"), value[1]!.format("YYYY-MM-DD")),
    enabled: !!value[0] && !!value[1], // Enable query only if both dates are selected
  });
};
