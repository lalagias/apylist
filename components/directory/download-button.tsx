'use client';

import { Button } from "@/components/ui/button";
import { FilteredItem } from "@/types/data";

interface DownloadButtonProps {
  data: FilteredItem[];
}

export function DownloadButton({ data }: DownloadButtonProps) {
  const downloadCSV = () => {
    // Convert data to CSV
    const headers = ['Name', 'Provider', 'Type', 'APY (%)', 'Risk', 'TVL (USD)', 'Chain', 'Project'];
    const csvRows = [
      headers,
      ...data.map(item => [
        item.name,
        item.provider,
        item.type,
        item.apy,
        item.risk,
        item.tvlUsd,
        item.chain,
        item.project
      ])
    ];

    const csvContent = csvRows
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'apy-list-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" onClick={downloadCSV} type="button">
      Download CSV
    </Button>
  );
} 