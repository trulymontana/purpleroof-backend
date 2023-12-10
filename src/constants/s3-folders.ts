export const s3Folders = {
  mortgageApplications: 'mortgage-applications',
  properties: 'properties',
  requirements: 'requirements',
  users: 'users',
} as const;

export type S3Folders = (typeof s3Folders)[keyof typeof s3Folders];
