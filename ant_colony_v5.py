# -*- coding: utf-8 -*-
"""
Created on Wed Jul 19 18:24:47 2017

@author: jaewonkwon
"""

#!/usr/bin/env python
import random
#import json
#import math

def main_program(json_map,trail=[]):
    #first take the map and transform it to line objects
    #line_list_dict = json.loads(json_map)

        
    line_list = line_generator(json_map)
    test_crawler1 = crawler(200,0,"test1")
    test_crawler2 = crawler(200,0,"test2")
    test_crawler3 = crawler(200,0,"test2")
    additional_crawlers = [crawler(200,0,"test2"),crawler(200,0,"test2")]

    #crawler_moves= {}
    crawler1_moves =[]
    crawler2_moves =[]
    crawler3_moves =[]
    add_crawler_moves= []
    
    crawler1_moves.append([test_crawler1.x, test_crawler1.y])
    crawler2_moves.append([test_crawler2.x, test_crawler2.y])
    crawler3_moves.append([test_crawler3.x, test_crawler3.y])

    
    crawler1_update = True
    crawler1_reverse = False
    crawler2_update = True
    crawler2_reverse = False
    crawler3_update = True
    crawler3_reverse = False

    addCrawler_update= []
    addCrawler_reverse = []

    for addCrawler_num in range(len(additional_crawlers)):
        addCrawler_update.append(True)
        addCrawler_reverse.append(False)
        add_crawler_moves.append([])
        add_crawler_moves[addCrawler_num].append([additional_crawlers[addCrawler_num].x,
                                  additional_crawlers[addCrawler_num].y])
        
    if trail == []:
        rep = 0
        for turn in range(4000):
            if (crawler1_update) == True:
                if (test_crawler1.y < 400 and (crawler1_reverse == False)):
                    next_move = test_crawler1.next_move(line_list)
                    test_crawler1.update(next_move)
                    crawler1_moves.append(test_crawler1.list_current_location)
                    trail.append(test_crawler1.list_current_location)
                    if test_crawler1.y == 400:
                        crawler1_reverse = True
                if (crawler1_reverse):
                    next_move = test_crawler1.next_move(line_list,'default','reverse')
                    test_crawler1.update(next_move)
                    crawler1_moves.append(test_crawler1.list_current_location)
                    trail.append(test_crawler1.list_current_location)
                    if test_crawler1.y == 0:
                        crawler1_update = False
                    
            if (crawler2_update):
                if (test_crawler2.y < 400 and (crawler2_reverse == False)):
                    next_move = test_crawler2.next_move(line_list)
                    test_crawler2.update(next_move)
                    crawler2_moves.append(test_crawler2.list_current_location)
                    trail.append(test_crawler2.list_current_location)
                    if test_crawler2.y == 400:
                        crawler2_reverse = True
                if (crawler2_reverse):
                    next_move = test_crawler2.next_move(line_list,'default','reverse')
                    test_crawler2.update(next_move)
                    crawler2_moves.append(test_crawler2.list_current_location)
                    trail.append(test_crawler2.list_current_location)
                    if test_crawler2.y == 0:
                        crawler2_update = False

            if (crawler3_update) and (rep > 200):
                if (test_crawler3.y < 400 and (crawler3_reverse == False)):
                    next_move = test_crawler3.next_move(line_list,trail)
                    test_crawler3.update(next_move)
                    crawler3_moves.append(test_crawler3.list_current_location)
                    trail.append(test_crawler3.list_current_location)
                    if test_crawler3.y == 400:
                        crawler3_reverse = True  
                if (crawler3_reverse):
                    next_move = test_crawler3.next_move(line_list,trail,'reverse')
                    test_crawler3.update(next_move)
                    crawler3_moves.append(test_crawler3.list_current_location)
                    trail.append(test_crawler3.list_current_location)
                    if test_crawler3.y == 0:
                        crawler3_update = False   

            add_startreps = 300
            for crawler_num in range(len(additional_crawlers)):
                #repeating the updating steps for every crawler in additional crawlers
                if (addCrawler_update[crawler_num]) and (rep > add_startreps):
                    
                    if (additional_crawlers[crawler_num].y < 400 and (
                            addCrawler_reverse[crawler_num]== False)):
                        next_move = additional_crawlers[crawler_num].next_move(line_list,trail)
                        additional_crawlers[crawler_num].update(next_move)
                        add_crawler_moves[crawler_num].append(
                                additional_crawlers[crawler_num].list_current_location)
                        trail.append(additional_crawlers[crawler_num].list_current_location)
                        
                        if additional_crawlers[crawler_num].y == 400:
                            addCrawler_reverse[crawler_num] = True  
                            
                        if (addCrawler_reverse[crawler_num]):
                            next_move = additional_crawlers[crawler_num].next_move(
                                    line_list,trail,'reverse')
                            additional_crawlers[crawler_num].update(next_move)
                            add_crawler_moves[crawler_num].append(
                                    additional_crawlers[crawler_num].list_current_location)
                        trail.append(additional_crawlers[crawler_num].list_current_location)
                        
                        if additional_crawlers[crawler_num].y == 0:
                            addCrawler_update[crawler_num] = False
                            
                add_startreps+= 200
            
            if ((crawler1_update == False) and (crawler2_update == False) and
                (crawler3_update == False) and (True not in addCrawler_update)):
                break
        
            rep += 1
        crawler_moves= [{"trail": trail},{"moves": crawler1_moves}, {"moves": crawler2_moves},
                        {"moves": crawler3_moves}]
        
        for addCrawler_moves in add_crawler_moves:
            crawler_moves.append({"moves":addCrawler_moves})
        
        return crawler_moves
        
    else:        
        for turn in range(2000):
            for crawler_num in range(len(additional_crawlers)):
                
                if (addCrawler_update[crawler_num]):
                    
                    if (additional_crawlers[crawler_num].y < 400 and (
                            addCrawler_reverse[crawler_num]== False)):
                        next_move = additional_crawlers[crawler_num].next_move(line_list,trail)
                        additional_crawlers[crawler_num].update(next_move)
                        add_crawler_moves[crawler_num].append(
                                additional_crawlers[crawler_num].list_current_location)
                        trail.append(additional_crawlers[crawler_num].list_current_location)
                        
                        if additional_crawlers[crawler_num].y == 400:
                            addCrawler_reverse[crawler_num] = True  
                            
                        if (addCrawler_reverse[crawler_num]):
                            next_move = additional_crawlers[crawler_num].next_move(
                                    line_list,trail,'reverse')
                            additional_crawlers[crawler_num].update(next_move)
                            add_crawler_moves[crawler_num].append(
                                    additional_crawlers[crawler_num].list_current_location)
                        trail.append(additional_crawlers[crawler_num].list_current_location)
                        
                        if additional_crawlers[crawler_num].y == 0:
                            addCrawler_update[crawler_num] = False
            if (True not in addCrawler_update):
                break
        crawler_moves= [{"trail":trail}]
        for addCrawler_moves in add_crawler_moves:
            crawler_moves.append({"moves":addCrawler_moves})
    
        return crawler_moves
    


class point(object):
    
    def __init__(self,x, y):
        self.x = x
        self.y = y
        self.xy = self.x, self.y

    def distance(self, other):
        x_dist = (self.x - other.x)**2
        y_dist = (self.y - other.y)**2
        dist = (x_dist + y_dist)**(.5)
        return dist

    def __str__(self):
        return str(self.xy)
    
    def __repr__(self):
        return str(self.xy)
    

class line(object):
    def __init__(self, start_point, end_point):
        self.start_point = start_point
        self.end_point = end_point
        if self.end_point.x == self.start_point.x:
            self.slope = 0
        if self.end_point.x != self.start_point.x:
            self.slope = ((self.end_point.y - self.start_point.y)/(
                    self.end_point.x - self.start_point.x))
        self.b = (self.start_point.y - self.slope * (self.start_point.x))
        if self.start_point.y >= self.end_point.y:
            self.line_max_y = self.start_point.y
            self.line_min_y = self.end_point.y
        elif self.start_point.y < self.end_point.y:
            self.line_max_y = self.end_point.y
            self.line_min_y = self.start_point.y
        if self.start_point.x >= self.end_point.x:
            self.line_max_x = self.start_point.x
            self.line_min_x = self.end_point.x
        elif self.start_point.x < self.end_point.x:
            self.line_max_x = self.end_point.x
            self.line_min_x = self.start_point.x
            
        
    def all_coordinates(self):
        return ([[self.start_point.x, self.start_point.y],[self.end_point.x, self.end_point.y]])
    
    def get_y(self,x):
        if self.end_point.x == self.start_point.x:
            line_y = self.end_point.y
            return line_y
        else:
            line_y = (self.slope*(x) + self.b)
            return line_y
    
    def get_x(self,y):
        if self.end_point.x == self.start_point.x:
            return self.end_point.x
        else:
            line_x = ((y - self.b)/self.slope)
            return line_x 


    def is_inside(self, x, y):
        expected_y = self.get_y(x)
        if y == expected_y:
            return True
        else:
            return False


#be able to read the dictionary map and come up with coordinates

class crawler(object):
    def __init__(self, x,y,name):
        self.x = x
        self.y = y
        self.current_location = point(x,y)
        self.name = str(name)
        self.start_location = point(x,y)
        self.list_current_location = [self.x,self.y]
        
    def random_move(self, option= 'random', trail = 'default', mode = 'default'):
        #this is reverse mode for the crawler that is coming back,
        #the concept of backward and forward will be reversed
        
        if mode == 'reverse':
            forward = point(self.x, self.y -1)
            backward = point(self.x, self.y + 1)
        
        if mode == 'default':
            forward = point(self.x, self.y + 1)
            backward = point(self.x, self.y - 1)
        #crawler can randomly move 1 step in a direction
        #crawler can only move left, right, forward, backward
        left = point(self.x - 1, self.y)
        right = point(self.x + 1, self.y)
        #direction_dict = {'0':'left', '1': 'right', '2': 'forward', '3':'backward'}
        possible_moves = [left,right,forward, backward]
        random_direction =random.randint(0,2)
        
        trail_possible = [left,right,forward]
        
        if (trail != 'default') and (option == 'random'):
            for trail_point in trail:
                if trail_point in trail_possible:
                    trail_possible += [trail_point]
            random_direction = random.choice(trail_possible)
            return random_direction
        if (trail == 'default') and (option == 'random'):
            return possible_moves[random_direction]
        if option == 'backward':
            return possible_moves[3]
        
        if option == '0':
            return possible_moves[0]

        if option == '1':
            return possible_moves[1]

        if option == '2':
            return possible_moves[2]                 
    
    def is_next_move(self, random_move,line_list):
        is_next_move = True
        random_point = random_move
        for line_item in line_list:
            if random_point.y in range(line_item.line_min_y, line_item.line_max_y + 1):
                line_x =((line_item.get_x(random_point.y)))
                current_x = self.x
                next_x = random_point.x
 
                if next_x >= current_x:
                    max_x = next_x
                    min_x = current_x
                elif next_x < current_x:
                    max_x = current_x
                    min_x = next_x
                if ((line_x >= min_x) and (line_x <= max_x)):
                    is_next_move = False
                    return is_next_move
            if ((random_point.x >= line_item.line_min_x) and (
                    random_point.x <= line_item.line_max_x)):
                line_y =((line_item.get_y(random_point.x)))
                current_y = self.y
                next_y = random_point.y
                if next_y >= current_y:
                    max_y = next_y
                    min_y = current_y
                elif next_y < current_y:
                    max_y = current_y
                    min_y = next_y
                if ((line_y>= min_y) and (line_y <= max_y)):
                    is_next_move = False
                    return is_next_move      
        return is_next_move

    def next_move(self, line_list,trail= 'default', mode = 'default'):
        
        left_move = self.random_move('0', mode)
        right_move = self.random_move('1', mode)
        forward_move = self.random_move('2',mode)
        next_move = None
        
        #if L,R,F options are not possible, we need to go back
        if ((self.is_next_move(left_move,line_list) == False) and (self.is_next_move(right_move, line_list) == False) and
        (self.is_next_move(forward_move, line_list) == False)):
            next_move= self.random_move('backward',mode)
        
        
        #now we know that one of them is possible, try getting a valid random move
        random_point = self.random_move('random',trail,mode)
        while self.is_next_move(random_point, line_list) == False:
            random_point= self.random_move('random', trail,mode)
        if self.is_next_move(random_point, line_list):
            next_move = random_point
        return next_move
    
    def update(self,other):
        self.x = other.x
        self.y = other.y
        self.current_location = other
        self.list_current_location = [other.x, other.y]

        

def line_generator(line_dict):
    line_list = []
    for line_item in line_dict:
        new_line = line_dict[line_item]
        new_line_start = point((new_line[0][0]),(new_line[0][1]))
        new_line_end = point((new_line[1][0]), (new_line[1][1]))
        line_list.append(line(new_line_start, new_line_end))
    return line_list

def test_crawler():
    test_crawler = crawler(200,300,"test")
    test_line = line(point(246.66667,100), point(330,200))
    test_line_list = [test_line]
    global test_list
    global test_trail
    for c in range(100):
        tcrawler_next = test_crawler.next_move(test_line_list)
        test_crawler.update(tcrawler_next)
        test_list.append(test_crawler.list_current_location)
        test_trail.append(test_crawler.list_current_location)
    


        