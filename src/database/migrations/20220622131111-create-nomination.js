export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nominations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      member_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nominee_email: {
        type: Sequelize.STRING,
        allownull: false,
        unique:true
      },
      description: {
        type: Sequelize.TEXT
      },
      candidate_involvement: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      overall_talent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Nominations');
  }
};