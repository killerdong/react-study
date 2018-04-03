const getFakeMembers = async (count) => {
    const api = `https://api.randomuser.me/?nat=US&results=${count}`;

    const response = await fetch(api);

    if (response.status === 200) {
        const json = await response.json();
        return json.results;    
    }  else {
        throw new Error(response.statusText);
    }
};

export { getFakeMembers };