export const Config = {
  API_URI: {
    POKEMON_LIST: `${process.env.NEXT_PUBLIC_API_URI}/pokemon`,
    POKEMON_DETAIL: (id: string): string =>
      `${process.env.NEXT_PUBLIC_API_URI}/pokemon/${id}`,
    POKEMON_IMAGE: (id: string): string =>
      `${process.env.NEXT_PUBLIC_IMAGE_URI}/${id}.png`,
  },
};
