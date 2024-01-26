// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: "/",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  profile: path(ROOTS_DASHBOARD, "/profile"),
  // offerConfigurations: {
  //   root: path(ROOTS_DASHBOARD, '/offerConfigurations'),
  //   create: path(ROOTS_DASHBOARD, '/offerConfigurations/create'),
  //   duplicate: path(ROOTS_DASHBOARD, '/offerConfigurations/duplicate'),
  //   edit: path(ROOTS_DASHBOARD, '/offerConfigurations/edit/:id'),
  // },
  // user: {
  //   root: path(ROOTS_DASHBOARD, '/user'),
  //   five: path(ROOTS_DASHBOARD, '/user/five'),
  //   six: path(ROOTS_DASHBOARD, '/user/six'),
  // },
};

export const PATH_RULES = {
  root: "/rules",
  create: "/rules/create",
  edit: "/rules/edit",
};
