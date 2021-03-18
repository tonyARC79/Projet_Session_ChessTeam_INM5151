module.exports = (sequelize, DataTypes) => {
  const RelationshipType = sequelize.define('relationship_type', {
    // Model attributes are defined here
    relationship_type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true
  });

  RelationshipType.associate = function (models) {

    RelationshipType.hasMany(models.relationship, {
      as: 'relationship',
      foreignKey: 'type_fk'
    });
  };
  return RelationshipType;
};