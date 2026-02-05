"use client"

import { useState, useEffect } from "react"

const currencies: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  KRW: "₩",
  BTC: "₿",
  AED: "د.إ",
  SAR: "﷼",
}

export function useCurrency() {
  const [currencySymbol, setCurrencySymbol] = useState("$")

  useEffect(() => {
    // Load saved currency
    const savedCurrency = localStorage.getItem("finsim_currency") || "USD"
    setCurrencySymbol(currencies[savedCurrency] || "$")

    // Listen for currency changes
    const handleCurrencyChange = (e: CustomEvent) => {
      setCurrencySymbol(currencies[e.detail] || "$")
    }
    window.addEventListener("currencyChange", handleCurrencyChange as EventListener)
    return () => window.removeEventListener("currencyChange", handleCurrencyChange as EventListener)
  }, [])

  const formatMoney = (amount: number, options?: { showSign?: boolean }) => {
    const formatted = `${currencySymbol}${Math.abs(amount).toLocaleString()}`
    if (options?.showSign) {
      return amount >= 0 ? `+${formatted}` : `-${formatted}`
    }
    return formatted
  }

  return { currencySymbol, formatMoney }
}

export { currencies }
