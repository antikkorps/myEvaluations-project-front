import { Refine } from '@refinedev/core';

const appUrl = process.env.APP_URL;

Refine.config({
  // User
  userIndexURL: `${appUrl}/users`,
  userShowURL: (userId) => `${appUrl}/users/${userId}`,
  // userCreateURL: `${appUrl}/users/create`,
  userStoreURL: `${appUrl}/users`,
  // userEditURL: (userId) => `${appUrl}/users/${userId}/edit`,
  // userUpdateURL: `${appUrl}/users`,
  userDeleteURL: (userId) => `${appUrl}/users/${userId}`,
  // userBulkDeleteURL: `${appUrl}/users/bulk-delete`,
  // userBulkDeleteURL: `${appUrl}/users`,

  // Role
  roleIndexURL: `${appUrl}/roles`,
  // roleCreateURL: `${appUrl}/roles/create`,
  roleStoreURL: `${appUrl}/roles`,
  roleEditURL: (roleId) => `${appUrl}/roles/${roleId}`,
  roleDeleteURL: (roleId) => `${appUrl}/roles/${roleId}`,
  // roleBulkDeleteURL: `${appUrl}/roles/bulk-delete`,

  // Contrat
  contratIndexURL: `${appUrl}/contrats`,
  // contratCreateURL: `${appUrl}/contrats/create`,
  contratStoreURL: `${appUrl}/contrats`,
  // contratEditURL: (contratId) => `${appUrl}/contrats/${contratId}/edit`,
  contratDeleteURL: (contratId) => `${appUrl}/contrats/${contratId}`,
  // contratBulkDeleteURL: `${appUrl}/contrats/bulk-delete`,

  // Tag
  tagIndexURL: `${appUrl}/tags`,
  // tagCreateURL: `${appUrl}/tags/create`,
  tagStoreURL: `${appUrl}/tags`,
  // tagEditURL: (tagId) => `${appUrl}/tags/${tagId}/edit`,
  tagDeleteURL: (tagId) => `${appUrl}/tags/${tagId}`,
  // tagBulkDeleteURL: `${appUrl}/tags/bulk-delete`,
});

export default Refine;
