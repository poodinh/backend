import { Express } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export default function setUp (app:Express): void{
    const options: Options = {
        definition: {
            "openapi": "3.0.0",
            "info": {
              "title": "Backend Final Project",
              "description": "The API for the backend final project. This consists on an API to power a website that enables users to discover and watch movie trailers. To access to see the movie trailers, users must register and log in.",
              "version": "1.0.0"
            },
            "servers": [
              {
                "url": "https://virtserver.swaggerhub.com/GoncaloCardoso/Backend/1.0.0",
                "description": "SwaggerHub API Auto Mocking"
              },
              {
                "url": "http://localhost:{Port}/",
                "description": "The API is not online. It must run on your local server"
              }
            ],
            "paths": {
              "/auth/users": {
                "get": {
                  "tags": [
                    "User"
                  ],
                  "summary": "Returns all registered users",
                  "description": "This must be done by a logged ADMIN.",
                  "operationId": "getUsers",
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedUser"
                            }
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "500": {
                      "description": "Failed to get all users"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              },
              "/auth/users/register": {
                "post": {
                  "tags": [
                    "User"
                  ],
                  "summary": "Register a new user",
                  "description": "Register a new user to the website",
                  "operationId": "registerUser",
                  "requestBody": {
                    "description": "User object to create",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/users_register_body"
                        }
                      }
                    },
                    "required": true
                  },
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/receivedUser"
                          }
                        }
                      }
                    },
                    "422": {
                      "description": "Invalid input. See schema with the various possible status(422) errors",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/inline_response_422"
                          }
                        }
                      }
                    },
                    "500": {
                      "description": "Failed to create user"
                    }
                  }
                }
              },
              "/auth/users/login": {
                "post": {
                  "tags": [
                    "User"
                  ],
                  "summary": "Login a user",
                  "description": "Login user to the website",
                  "operationId": "loginUser",
                  "requestBody": {
                    "description": "User object to log",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/users_login_body"
                        }
                      }
                    },
                    "required": true
                  },
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/inline_response_201"
                          }
                        }
                      }
                    },
                    "404": {
                      "description": "Information incorrect. See schema with the various possible status(404) errors",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/inline_response_404"
                          }
                        }
                      }
                    },
                    "422": {
                      "description": "Invalid input. See schema with the various possible status(422) errors",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/inline_response_422_1"
                          }
                        }
                      }
                    },
                    "500": {
                      "description": "Failed to create user"
                    }
                  }
                }
              },
              "/auth/users/{userID}": {
                "put": {
                  "tags": [
                    "User"
                  ],
                  "summary": "Update user by ID",
                  "description": "This must be done by a logged ADMIN. Doesn't need to have all the user information, just the ones wanting to update.",
                  "operationId": "updateUser",
                  "parameters": [
                    {
                      "name": "userID",
                      "in": "path",
                      "description": "ID of the user to update",
                      "required": true,
                      "style": "simple",
                      "explode": false,
                      "schema": {
                        "type": "string"
                      }
                    }
                  ],
                  "requestBody": {
                    "description": "User object to update",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/users_userID_body"
                        }
                      }
                    },
                    "required": true
                  },
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedUser"
                            }
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "404": {
                      "description": "User not found"
                    },
                    "500": {
                      "description": "Failed to update user"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              },
              "/auth/user/{userID}": {
                "delete": {
                  "tags": [
                    "User"
                  ],
                  "summary": "Delete user by ID",
                  "description": "This must be done by a logged ADMIN.",
                  "operationId": "deleteUser",
                  "parameters": [
                    {
                      "name": "userID",
                      "in": "path",
                      "description": "ID of the user to delete",
                      "required": true,
                      "style": "simple",
                      "explode": false,
                      "schema": {
                        "type": "string"
                      }
                    }
                  ],
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedUser"
                            }
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "404": {
                      "description": "User not found"
                    },
                    "500": {
                      "description": "Failed to update user"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              },
              "/api/movies/search*": {
                "get": {
                  "tags": [
                    "Movies"
                  ],
                  "summary": "Filter of movies",
                  "description": "This must be done by a logged USER. The information given can be either the title, release date or a genre. Doesn't have to be the full title or date, it accepts just one or two words of the title or the year of release.",
                  "operationId": "filterMovies",
                  "parameters": [
                    {
                      "name": "filter",
                      "in": "query",
                      "description": "Value used to filter the movie",
                      "required": true,
                      "style": "form",
                      "explode": true,
                      "schema": {
                        "type": "string"
                      }
                    }
                  ],
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedMovie"
                            }
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "404": {
                      "description": "Movie not found"
                    },
                    "500": {
                      "description": "Failed to find the movies"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              },
              "/api/movies/sortby*": {
                "get": {
                  "tags": [
                    "Movies"
                  ],
                  "summary": "Sort movies",
                  "description": "This must be done by a logged USER. The key should be the category that's used to sort. It can only be title or releaseDate. The value accepts 4 different strings asc, ascending, desc and descending. The first 2 make it sort in ascending order and the final 2 in descending order.",
                  "operationId": "sorterMovies",
                  "parameters": [
                    {
                      "name": "InfoSorter",
                      "in": "query",
                      "description": "Value used to filter the movie",
                      "required": true,
                      "style": "form",
                      "explode": true,
                      "schema": {
                        "$ref": "#/components/schemas/InfoSorter"
                      }
                    }
                  ],
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedMovie"
                            }
                          }
                        }
                      }
                    },
                    "400": {
                      "description": "Key or value are incorrect"
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "500": {
                      "description": "Failed to find the movies"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              },
              "/api/movies": {
                "get": {
                  "tags": [
                    "Movies"
                  ],
                  "summary": "Returns all movies in the server",
                  "description": "This must be done by a logged USER.",
                  "operationId": "getMovies",
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedMovie"
                            }
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "500": {
                      "description": "Failed to get all movies"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                },
                "post": {
                  "tags": [
                    "Movies"
                  ],
                  "summary": "Post a new movie",
                  "description": "This must be done by a logged ADMIN. It can have a movie poster, that should be a file. If it has more than one genre, multiple keys with genres should be used.",
                  "operationId": "postMovie",
                  "requestBody": {
                    "description": "User object to log",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/api_movies_body"
                        }
                      }
                    },
                    "required": true
                  },
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/receivedMovie"
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "422": {
                      "description": "Invalid input. See schema with the various possible status(422) errors",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/inline_response_422_2"
                          }
                        }
                      }
                    },
                    "500": {
                      "description": "Failed to create user"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              },
              "/api/movies/{movieID}": {
                "put": {
                  "tags": [
                    "Movies"
                  ],
                  "summary": "Update movie by ID",
                  "description": "This must be done by a logged ADMIN. Doesn't need to have all the movie information, just the ones wanting to update.",
                  "operationId": "updateMovie",
                  "parameters": [
                    {
                      "name": "movieID",
                      "in": "path",
                      "description": "ID of the movie to update",
                      "required": true,
                      "style": "simple",
                      "explode": false,
                      "schema": {
                        "type": "string"
                      }
                    }
                  ],
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedMovie"
                            }
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "404": {
                      "description": "Movie not found"
                    },
                    "500": {
                      "description": "Failed to update movie"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                },
                "post": {
                  "tags": [
                    "Movies"
                  ],
                  "summary": "Rate a Movie",
                  "description": "This must be done by a logged USER. The value of the rating must be between 1 and 5.",
                  "operationId": "rateMovie",
                  "parameters": [
                    {
                      "name": "movieID",
                      "in": "path",
                      "description": "ID of the movie to update",
                      "required": true,
                      "style": "simple",
                      "explode": false,
                      "schema": {
                        "type": "string"
                      }
                    }
                  ],
                  "requestBody": {
                    "description": "Movie rating",
                    "content": {
                      "application/json": {
                        "schema": {
                          "$ref": "#/components/schemas/movies_movieID_body"
                        }
                      }
                    },
                    "required": true
                  },
                  "responses": {
                    "201": {
                      "description": "Sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "$ref": "#/components/schemas/ratedMovie"
                          }
                        }
                      }
                    },
                    "400": {
                      "description": "Invalid rating"
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "404": {
                      "description": "Movie or ID not found"
                    },
                    "500": {
                      "description": "Failed to update movie"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              },
              "/api/movie/{movieID}": {
                "delete": {
                  "tags": [
                    "Movies"
                  ],
                  "summary": "Delete movie by ID",
                  "description": "This must be done by a logged ADMIN.",
                  "operationId": "deleteMovie",
                  "parameters": [
                    {
                      "name": "movieID",
                      "in": "path",
                      "description": "ID of the movie to delete",
                      "required": true,
                      "style": "simple",
                      "explode": false,
                      "schema": {
                        "type": "string"
                      }
                    }
                  ],
                  "responses": {
                    "201": {
                      "description": "sucessfull operation",
                      "content": {
                        "application/json": {
                          "schema": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/receivedUser"
                            }
                          }
                        }
                      }
                    },
                    "401": {
                      "description": "Unauthorized. No token"
                    },
                    "403": {
                      "description": "Access forbidden"
                    },
                    "404": {
                      "description": "Movie not found"
                    },
                    "500": {
                      "description": "Failed to delete user"
                    }
                  },
                  "security": [
                    {
                      "bearerAuth": []
                    }
                  ]
                }
              }
            },
            "components": {
              "schemas": {
                "receivedUser": {
                  "type": "object",
                  "properties": {
                    "userId": {
                      "type": "string",
                      "example": "6124fsa452152saxzdfsa12"
                    },
                    "name": {
                      "type": "string",
                      "example": "Goncalo"
                    },
                    "email": {
                      "type": "string",
                      "example": "goncalo@email.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "P@ssword123"
                    },
                    "role": {
                      "type": "string",
                      "example": "ADMIN"
                    }
                  },
                  "description": "ok"
                },
                "receivedMovie": {
                  "type": "object",
                  "properties": {
                    "movieID": {
                      "type": "string",
                      "example": "6124fsa452152saxzdfsa12"
                    },
                    "title": {
                      "type": "string",
                      "example": "Title"
                    },
                    "releaseDate": {
                      "type": "string",
                      "example": "2024-12-12"
                    },
                    "trailerLink": {
                      "type": "string",
                      "example": "https://www.youtube.com/wfdawfa"
                    },
                    "posterUrl": {
                      "type": "string",
                      "example": "asgf325tfg2.html"
                    },
                    "genres": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "Drama"
                      }
                    }
                  },
                  "description": "ok"
                },
                "ratedMovie": {
                  "type": "object",
                  "properties": {
                    "movieID": {
                      "type": "string",
                      "example": "6124fsa452152saxzdfsa12"
                    },
                    "title": {
                      "type": "string",
                      "example": "Title"
                    },
                    "releaseDate": {
                      "type": "string",
                      "example": "2024-12-12"
                    },
                    "trailerLink": {
                      "type": "string",
                      "example": "https://www.youtube.com/wfdawfa"
                    },
                    "posterUrl": {
                      "type": "string",
                      "example": "asgf325tfg2.html"
                    },
                    "genres": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "Drama"
                      }
                    },
                    "ratings": {
                      "$ref": "#/components/schemas/ratedMovie_ratings"
                    }
                  },
                  "description": "ok"
                },
                "nameError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "user name is required"
                    }
                  }
                },
                "emailError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Invalid email format"
                    }
                  }
                },
                "passwordError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Password not strong enough"
                    }
                  }
                },
                "roleError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Invalid role"
                    }
                  }
                },
                "usedEmailError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Email already in use"
                    }
                  }
                },
                "invalidEmailError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Invalid email"
                    }
                  }
                },
                "invalidPasswordError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Invalid password"
                    }
                  }
                },
                "titleError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Title is required"
                    }
                  }
                },
                "releaseDateError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Release date is required"
                    }
                  }
                },
                "trailerLinkError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Trailer link is required"
                    }
                  }
                },
                "genresError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Genres are required"
                    }
                  }
                },
                "movieError": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Movie already exists"
                    }
                  }
                },
                "users_register_body": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "example": "John"
                    },
                    "email": {
                      "type": "string",
                      "example": "john@email.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "P@ssword123"
                    },
                    "role": {
                      "type": "string",
                      "example": "ADMIN"
                    }
                  }
                },
                "inline_response_422": {
                  "description": "All possible errors",
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/nameError"
                    },
                    {
                      "$ref": "#/components/schemas/emailError"
                    },
                    {
                      "$ref": "#/components/schemas/passwordError"
                    },
                    {
                      "$ref": "#/components/schemas/roleError"
                    },
                    {
                      "$ref": "#/components/schemas/usedEmailError"
                    }
                  ]
                },
                "users_login_body": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "john@email.com"
                    },
                    "password": {
                      "type": "string",
                      "example": "P@ssword123"
                    }
                  }
                },
                "inline_response_201": {
                  "type": "object",
                  "properties": {
                    "user": {
                      "$ref": "#/components/schemas/receivedUser"
                    },
                    "accessToken": {
                      "type": "string",
                      "example": "ree231w4ergdy1yr6dfvdsdf23"
                    }
                  }
                },
                "inline_response_404": {
                  "oneOf": [
                    {
                      "$ref": "#/components/schemas/invalidEmailError"
                    },
                    {
                      "$ref": "#/components/schemas/invalidPasswordError"
                    }
                  ]
                },
                "inline_response_422_1": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/emailError"
                    },
                    {
                      "$ref": "#/components/schemas/passwordError"
                    }
                  ]
                },
                "users_userID_body": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "richard@email.com"
                    },
                    "name": {
                      "type": "string",
                      "example": "richard"
                    }
                  }
                },
                "InfoSorter": {
                  "type": "object",
                  "properties": {
                    "sorterCategory": {
                      "type": "string",
                      "example": "asc"
                    }
                  }
                },
                "api_movies_body": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string",
                      "example": "Movie Title"
                    },
                    "releaseDate": {
                      "type": "string",
                      "example": "2024-25-08"
                    },
                    "trailerLink": {
                      "type": "string",
                      "example": "https://www.youtube.com"
                    },
                    "poster": {
                      "type": "string",
                      "example": "Should use form-data to add a file"
                    },
                    "genres": {
                      "type": "string",
                      "example": "If more then one add more keys withs genres"
                    }
                  }
                },
                "inline_response_422_2": {
                  "description": "All possible errors",
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/titleError"
                    },
                    {
                      "$ref": "#/components/schemas/releaseDateError"
                    },
                    {
                      "$ref": "#/components/schemas/trailerLinkError"
                    },
                    {
                      "$ref": "#/components/schemas/genresError"
                    },
                    {
                      "$ref": "#/components/schemas/movieError"
                    }
                  ]
                },
                "movies_movieID_body": {
                  "type": "object",
                  "properties": {
                    "userID": {
                      "type": "string",
                      "example": "Movie rating"
                    }
                  }
                },
                "ratedMovie_ratings": {
                  "type": "object",
                  "properties": {
                    "userID": {
                      "type": "string",
                      "example": "4.5"
                    }
                  }
                }
              },
              "securitySchemes": {
                "bearerAuth": {
                  "type": "http",
                  "scheme": "bearer",
                  "bearerFormat": "JWT"
                }
              }
            }
          },
        apis: ['./src/**/*.ts'],
      };
    const specs = swaggerJsdoc(options)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}

