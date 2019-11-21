export const fetchData = async () => {
    const res = await fetch('/data');
    const data = await res.json();
    // return new Promise((resolve, reject) => setTimeout(() => resolve(data), 1000));
    return data;
};
