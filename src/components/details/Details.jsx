import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchDetails, fetchCredits, fetchVideos, imagePath, imagePathOriginal } from "../api/movieService.js";
import { CalendarIcon, ClockIcon } from "@heroicons/react/16/solid";
import { minutesTohours, ratingToPercentage } from "../../utils/helper.js";