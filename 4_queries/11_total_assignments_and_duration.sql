SELECT day, count(*) AS number_of_assignments, count(duration) AS duration
FROM assignments
GROUP BY day
ORDER BY day;