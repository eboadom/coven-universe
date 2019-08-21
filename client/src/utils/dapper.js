export const initDapper = async () => {
  if (typeof window.ethereum === "undefined" || !window.ethereum.isDapper) {
    console.log("Dapper not installed");
  }

  try {
    const accounts = await window.ethereum.enable();
    console.log(accounts);
    if (!accounts || accounts.length === 0) {
      // Show view to unlock Dapper
      console.log("Dapper locked");
    }
  } catch (error) {
    // Show view to unlock Dapper (maybe this catch is not needed)
    console.log("Dapper locked");
  }
};
