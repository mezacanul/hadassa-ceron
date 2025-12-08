import dayjs from "dayjs";
import { Box, Text, useToken } from "@chakra-ui/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState, useEffect } from "react";
import { loadHook } from "@/utils/lattice-design";
import styled from "@emotion/styled";
import { PickersCalendarHeader } from "@mui/x-date-pickers/PickersCalendarHeader";
import "dayjs/locale/es";
dayjs.locale("es");

const CalendarOverrides = styled("div")({
    // Hide Sunday weekday label (still safe)
    ".MuiDayCalendar-weekDayLabel:nth-of-type(7)": {
        display: "none",
    },

    // Hide ALL 7th children of each week container (buttons or divs)
    ".MuiDayCalendar-weekContainer :nth-child(7)": {
        display: "none",
    },

    ".MuiPickersCalendarHeader-label": {
        fontSize: "1.2rem",
        fontWeight: 700,
        textTransform: "capitalize",
    },
});

export default function CalendarioMesV2() {
    const pink = useToken("colors", "pink.600");
    const [value, setValue] = useState(dayjs());
    const [selectedDate, setSelectedDate] = loadHook(
        "useSelectedDate"
    );

    useEffect(() => {
        if (selectedDate) {
            setValue(dayjs(selectedDate));
        }
    }, []);

    function handleChange(newValue) {
        const formattedDate = newValue.format("YYYY-MM-DD");
        console.log("formattedDate", formattedDate);

        setSelectedDate(formattedDate);
        setValue(newValue);
    }

    return (
        <Box
            bg="white"
            w={"100%"}
        >
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
            >
                <CalendarOverrides>
                    <DateCalendar
                        value={value}
                        onChange={handleChange}
                        shouldDisableDate={(d) =>
                            d.day() === 0
                        }
                        slotProps={{
                            calendarHeader: {
                                sx: {
                                    "& .MuiPickersCalendarHeader-label":
                                        {
                                            color: pink,
                                        },
                                },
                            },
                        }}
                    />
                </CalendarOverrides>
            </LocalizationProvider>
        </Box>
    );
}
