#!/usr/bin/env python3

def is_winner(gameboard):
    result= {"is_winner": False, "winning_letter": None}
    is_row_winner = is_winninglist(gameboard)
    is_col_winner = is_winninglist(col_generator(gameboard))
    is_diag_winner = is_winninglist(diag_generator(gameboard))
    if is_row_winner["is_winner"] == True:
        result = is_row_winner
    if is_col_winner["is_winner"] == True:
        result = is_col_winner
    if is_diag_winner["is_winner"] == True:
        result = is_diag_winner
    return result

def is_winninglist(gamerows):
    winning_row = False
    winning_letter = ''
    for row in gamerows:
        if (None not in row) and (("X" in row) and ("O" in row) == False):
            winning_row = True
            winning_letter = row[0]
    return {"is_winner": winning_row, "winning_letter": winning_letter}

def col_generator(gameboard):
    col_len = len(gameboard)
    all_col_list=[]
    for col in range(col_len):
        col_list=[]
        for row in gameboard:
            col_list.append(row[col])
        all_col_list.append(col_list)
    return all_col_list

def diag_generator(gameboard):
    col_len = len(gameboard)
    diag_list1= []
    diag_list2= []
    for col in range(col_len):
        diag_list1.append(gameboard[col][col])
        diag_list2.append(gameboard[col][col_len - col - 1])
    return [diag_list1, diag_list2]

print(is_winner([["X","X",None],["X", "O", "O"],["X","O","O"]]))

    #!/usr/bin/env python

