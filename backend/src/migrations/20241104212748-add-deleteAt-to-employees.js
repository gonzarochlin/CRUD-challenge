import { DataTypes } from 'sequelize';
'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Employees', 'deletedAt', {
    type: DataTypes.DATE,
    allowNull: true,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Employees', 'deletedAt');
}
