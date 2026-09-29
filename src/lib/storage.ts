export function resetAllData() {
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("vesttrack:")) localStorage.removeItem(k);
    });
  } catch {}
}

export function clearAllData() { resetAllData(); }
