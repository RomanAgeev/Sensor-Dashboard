export const fetchData = async () => {
    const res = await fetch('/data');
    const data = await res.json();
    return data;
};
