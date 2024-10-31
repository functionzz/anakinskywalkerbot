import Video from "./Video.js";

const models = { Video };

// associates other models with each other for Many to Many, Many to One relationships
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
