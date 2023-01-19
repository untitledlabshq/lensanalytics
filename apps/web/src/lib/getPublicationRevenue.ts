/**
 *
 * @param publication Publication obj
 */

const getPublicationRevenue = (publication: any) => {
  let amountPerPublication = 0;
  const collects = publication.stats.totalAmountOfCollects;

  if (publication.collectModule && publication.collectModule?.amount) {
    const value = Number(publication.collectModule?.amount?.value);
    amountPerPublication = value;
    return {
      asset: publication.collectModule?.amount?.asset,
      value: value * collects,
    };
  }

  return { asset: null, value: amountPerPublication };
};

export default getPublicationRevenue;
