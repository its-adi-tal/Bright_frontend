import {useMemo} from "react";
import styles from "./TimeSelectPicker.module.css";

export default function TimeSelect({valueMinutes, onChange, step=15, label}) {
    //calc the hours list once per render
    const options = useMemo(() => {
        const arr= [];
        for (let m = 0; m < 24 * 60; m += step) {
      const hh = String(Math.floor(m / 60)).padStart(2, "0");
      const mm = String(m % 60).padStart(2, "0");
      arr.push({ label: `${hh}:${mm}`, value: m });
    }
    return arr;
  }, [step]);

  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <select
        value={valueMinutes ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #D9DFF7", background: "#fff" }}
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
} 