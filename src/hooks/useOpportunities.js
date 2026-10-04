import { useState, useEffect } from "react";
import { fetchOpportunityCards } from "../api/opportunities";

export function useOpportunities({
  page = 0,
  size = 12,
  search = "",
  category = "",
  format = "",
} = {}) {
  const [opportunities, setOpportunities] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchOpportunityCards({
          page,
          size,
          search,
          category,
          format,
        });

        if (!isMounted) return;

        // Spring Boot Page response
        setOpportunities(data.content ?? []);
        setTotalPages(data.totalPages ?? 0);
        setTotalElements(data.totalElements ?? 0);
      } catch (err) {
        if (!isMounted) return;

        setOpportunities([]);
        setTotalPages(0);
        setTotalElements(0);
        setError(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [page, size, search, category, format]);

  return {
    opportunities,
    totalPages,
    totalElements,
    loading,
    error,
  };
}