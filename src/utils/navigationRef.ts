// navigationRef.ts
export let navigateRef: ((path: string) => void) | null = null;
export const setNavigate = (nav: (path: string) => void) => {
  navigateRef = nav;
};
