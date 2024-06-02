import { Prisma } from '@prisma/client';

export const sampleTestData: Prisma.TestCreateManyInput[] = [
  {
    description: 'Revising the Select Query I',
    question: `
      Query all columns for all American cities in the CITY table with populations larger than 100000.
        The CountryCode for America is USA.`,
    test_category: 'SQL',
  },
  {
    description: 'Revising the Select Query II',
    question: `
      Query the NAME field for all American cities in the CITY table with populations larger than 120000. The CountryCode for America is USA.
      `,
    test_category: 'SQL',
  },
  {
    description: 'Select All',
    question: `Query all columns (attributes) for every row in the CITY table.`,
    test_category: 'SQL',
  },
  {
    description: 'Select By ID',
    question: ` Query all columns for a city in CITY with the ID 1661.`,
    test_category: 'SQL',
  },
  {
    description: "Japanese Cities' Attributes",
    question: `Query all attributes of every Japanese city in the CITY table. The COUNTRYCODE for Japan is JPN.
     
      `,
    test_category: 'SQL',
  },
];
