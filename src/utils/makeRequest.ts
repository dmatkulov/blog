const makeRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  
  if (response.ok) {
    return response.json();
  }
  
  throw new Error('Something went wrong');
};

export default makeRequest;