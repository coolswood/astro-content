export const instagram = (ids: string[]) => {
  return `<instagram ids="${ids.join(',')}"></instagram>`;
};

export const instagramStep = (
  primary?: string[],
  fallback?: string[],
): string[] => {
  if (primary?.length) {
    return [instagram(primary)];
  }

  if (fallback?.length) {
    return [instagram(fallback)];
  }

  return [];
};

export const q = (key: string, author: string): string => {
  return `<q data-author="${author}">${key}</q>`;
};

export const important = (key: string) => {
  return `<important>${key}</important>`;
};

export const activitylink = (id: string) => {
  return `<activitylink id="${id}"></activitylink>`;
};

export const step = (title: string, key: string) => {
  return `<step title="${title}">${key}</step>`;
};

export const dialog = ({
  psy,
  text,
  isMan,
}: {
  psy?: boolean;
  isMan?: boolean;
  text: string;
}) => {
  return `<dialog ${psy ? 'data-psy' : ''} ${
    isMan ? 'data-man' : ''
  }>${text}</dialog>`;
};
