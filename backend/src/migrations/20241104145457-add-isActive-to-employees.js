'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Employees', 'isActive', {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Employees', 'isActive');
}
