import Image from "next/image";
import styles from "./page.module.css";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Typography variant="h1">This is Rate calculator app</Typography>
    </main>
  );
}
