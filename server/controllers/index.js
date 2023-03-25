import AppError  from "../utils/appError/index.js";
import conn from "../services/db.js";
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
//getAllTodos handler to fetch all the todos in our database
export const getAllTodos = (req, res, next) => {
    conn.query("SELECT * FROM users", function (err, data, fields) {
        if (err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
        console.log("I send");
    });
};

//registerUser handler to add new todos to our database
export const registerUser = async (req, res, next) =>{
    console.log('registerUser');
    console.log(req.body);
    if (!req.body) return next(new AppError("No form data found", 404));
    // search for a user in the table
    const query = "SELECT * FROM users WHERE Email = '" + req.body.email + "'";
    const search = await conn.query(query);
    if (search.rows.length > 0) {
        // send to the user's page exists
        res.status(409).json({
            status: "success",
            message: "already exists",
        });
    }
    else{
        // insert into the table
        const insertQuery = 'INSERT INTO users (name, password, email) VALUES ($1, $2, $3)';
        const insertValues = [req.body.name, req.body.password, req.body.email];
        await conn.query(insertQuery, insertValues, (err) => {
            console.log(err);
            if (err) return next(new AppError(err, 500));

            res.status(201).json({
                status: "success",
                message: "todo created!",
            });
        });
    }
}


// //createTodo handler to add new todos to our database
// export const createTodo = (req, res, next) => {
//     console.log('createTodo');
//     if (!req.body) return next(new AppError("No form data found", 404));
//     console.log(req.body);
//     conn.query(
//         // "SELECT * FROM users WHERE Email = '" + req.body.email + "'",
//         // INSERT INTO users VALUES (1, 'Galaxy S9', 'Samsung', '4, 63000')
//         "INSERT INTO users (name, password, nickname) VALUES ('John', 'mypassword', 'JohnDoe')", 
//         (err, result) => {
//             if (err) return next(new AppError(err, 500));
//             if (result.length != 0)
//                 res.status(409).json({
//                     status: "success",
//                     message: "already exists",
//                 });
//             else{
//                 let userID;
//                 function searchInt(max, arr) {
//                     let a = Math.floor(Math.random() * max);
//                     return arr.includes(a) ? a : searchInt(max, arr);
//                 }
//                 function setValue(value){
//                     if(!value) return userID;
//                     let list = [];
//                     for(let i = 0; i < 100; i++){
//                         if(!value.includes(i)) list.push(i);
//                     }
//                     userID = searchInt(100, list);
//                     return userID;
//                 }
//                 conn.query("SELECT ID FROM users", function (err, data) {
//                     if (err) return next(new AppError(err))
//                     this.userID = setValue(data.map((result) => result['ID']));
//                     let str = "INSERT INTO users (ID, Username, Email, Registered, Status, Password) VALUES(" + this.userID + ",'"
//                     + req.body.name +"','"+ req.body.email +"','" + formatDate( new Date())
//                     +"', 1,'" + req.body.password +"')";
//                     conn.query(
//                         str,
//                         (error) => {
//                             if (error) return next(new AppError(error, 500));
//                             res.status(201).json({
//                                 status: "success",
//                                 message: "todo created!",
//                             });
//                         }
//                     );
//                 });
            
//             }
//         });
    
// };

export const checkUser = async (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [req.body.email, req.body.password ];
    await conn.query(query, values, (err, result) => {
        if (err) return next(new AppError(err, 500));
        console.log("------> Search Results")
        console.log(result.rows.length);
        if (result.rows.length !== 1){
            res.status(102).json({
                status: "success",
                message: "Incorrect credentials",
            });
        }
        else{
            res.status(200).json({
                status: "success",
                message: "Login successfully",
            });
        }
    });
}

// export const loginTodo = (req, res, next) => {
//     console.log('I get :');
//     console.log(req.body);
//     if (!req.body) return next(new AppError("No form data found", 404));
//     conn.query(
//         "SELECT * FROM users WHERE Email = '" + req.body.email + "' AND Password = '" + req.body.password +"'", 
//         (err, result) => {
//             if (err) return next(new AppError(err, 500));
//             console.log("------> Search Results")
//             console.log(result.length)
//             if (result.length !== 1)
//                 res.status(102).json({
//                     status: "success",
//                     message: "Incorrect credentials",
//                 });
//             else
//             res.status(200).json({
//                 status: "success",
//                 message: "Login successfully",
//             });
//         });
    
// };

//getTodo handler to get our todos by  IDs
export const getTodo = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    conn.query(
        "SELECT * FROM users WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

export const getTodos = (req, res, next) => {
    let userID;
    function searchInt(max, arr) {
        let a = Math.floor(Math.random() * max);
        return arr.includes(a) ? a : searchInt(max, arr);
    }
    const setValue = (value) => {
        let list = [];
        for(let i = 0; i < 100; i++){
            if(!value.includes(i)) list.push(i);
        }
        userID = searchInt(100, list);

        
    };
    conn.query("SELECT ID FROM users", function (err, data, fields) {
        if (err) return next(new AppError(err))
        setValue(data.map((result) => result['ID']));
        console.log(userID);
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });


};

//updateTodo handler to update our todos
export const updateTodo = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    conn.query(
        "UPDATE users SET status='completed' WHERE id=?",
        [req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo updated!",
            });
        }
    );
};


 //deleteTodo handler to delete a todo from our database
export const deleteTodo = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    conn.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo deleted!",
            });
        }
    );
}