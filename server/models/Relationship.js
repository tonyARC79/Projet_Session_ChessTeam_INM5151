module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('relationship', {
    related_relationship_fk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    relating_relationship_fk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type_fk: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true
  });

  Relationship.associate = function (models) {

    Relationship.belongsTo(models.relationship_type, {
      as: 'relationship_type',
      foreignKey: {
        name: 'type_fk',
        allowNull: false
      }
    }),
      Relationship.belongsTo(models.user, {
        as: 'relating_user',
        foreignKey: {
          name: 'relating_user_fk',
          allowNull: false
        }
      })
  };

  return Relationship;
};