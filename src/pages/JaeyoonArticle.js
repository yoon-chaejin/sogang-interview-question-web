import { Collapse, Container, createStyles, Grid, Icon, Link, List, ListItem, ListItemText, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowRight, Code, Description, InsertLink, Movie} from "@material-ui/icons";
import { React, useState, useEffect } from "react";
import { withRouter } from "react-router";
import NavigationBar from "../components/NavigationBar";
import { isValidateToken } from "../services/auth.service";

const useStyles = makeStyles((theme) => createStyles({
    articleContainer: {
        paddingTop: theme.spacing(3),
    },
    articleTitle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    articleSectionTitle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    articleBody: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        textAlign: ""
    },
    articleOrderedList: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    articleUnorderedList: {
        paddingLeft: theme.spacing(3),
    },
    img: {
        height: 300,
        [theme.breakpoints.down('xs')]: {
            height: 200,
        }
    },
    imgHorizontal: {
        height: 150,
        [theme.breakpoints.down('xs')]: {
            height: 70,
        },
        marginBottom: theme.spacing(1)
    },
    imgRectangular: {
        height: 200,
        [theme.breakpoints.down('xs')]: {
            height: 150
        }
    },
    table: {

    },
}))
const JaeyoonArticle = (props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState([false, false, false, false, false, false, false, false, false, false,
                                            false, false, false, false, false, false, false, false, false, false]);
    
    const createRows = (a, b, c, d) => {
        return {a, b, c, d}
    }

    const syllabusRows=[
        createRows('cs229', 'L2: Linear Regression and Gradient Descent'),
        createRows('cs229', "L3: Weighted Least Squares. Logistic regression. Newton's Method."),
        createRows('cs229', 'L4: Perceptron. Exponential family. Generalized Linear Models.'),
        createRows('cs231n', 'L2: Image Classification', 'python / numpy tutorial', 'https://cs231n.github.io/python-numpy-tutorial/'),
        createRows('cs231n', 'L3: Loss Functions and Optimization', 'assignment 1.1/1.2/1.3', 'https://cs231n.github.io/assignments2020/assignment1/'),
        createRows('cs231n', 'L4: Introduction to Neural Networks', 'assignment 1.4/1.5', 'https://cs231n.github.io/assignments2020/assignment1/'),
        createRows('cs231n', 'L5: Convolutional Neural Networks'),
        createRows('cs231n', 'L6: Training Neural Networks, part 1', 'assignment 2.1', 'https://cs231n.github.io/assignments2020/assignment2/'),
        createRows('cs231n', 'L7: Training Neural Networks, part 2', 'assignment 2.2/2.3', 'https://cs231n.github.io/assignments2020/assignment2/'),
        createRows('cs231n', 'L9: CNN Architectures', 'assignment 2.4/2.5', 'https://cs231n.github.io/assignments2020/assignment2/'),
        createRows('NYU', 'W10: Self-Supervised Learning'),
        createRows('cs231n', 'L10: Recurrent Neural Networks', 'assignment 3.1/3.2', 'https://cs231n.github.io/assignments2020/assignment3/'),
        createRows('NYU', 'W12: Deep Learning for NLP & Transformer'),
        createRows('NYU', 'W13: Graph Convolutional Network'),
        createRows('cs231n', 'L13: Generative Models', 'assignment 3.5', 'https://cs231n.github.io/assignments2020/assignment3/'),
    ]

    const paperRows = [
        createRows('Long Short-Term Memory Recurrent Neural Network Architecturesfor Large Scale Acoustic Modeling', '', 'LSTM', 'https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/43905.pdf'),
        createRows('Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation', '2014년 9월 3일', 'GRU', 'https://arxiv.org/abs/1406.1078'),
        createRows('Neural Machine Translation by Jointly Learning to Align and Translate', '2016년 5월 19일', 'RNN with attention', 'https://arxiv.org/abs/1409.0473'),
        createRows('Attention Is All You Need', '2017년 12월 6일', 'Transformer', 'https://arxiv.org/abs/1706.03762'),
        createRows('BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', '2018년 10월 11일', 'BERT', 'https://arxiv.org/abs/1810.04805'),
    ]

    const projectRows = [
        createRows('NSMC (네이버 영화 리뷰 데이터)', 'Sentiment Analysis', 'https://github.com/e9t/nsmc/'),
        createRows('KorQuAD 2.0', 'Question Answering', 'https://korquad.github.io/'),
        createRows('한국어 기계 번역 데이터', 'Machine Translation', 'https://aihub.or.kr/aidata/87'),
        createRows('KorNLI (한국어 자연어 추론 데이터)', 'Natural Language Inference', 'https://github.com/kakaobrain/KorNLUDatasets/tree/master/KorNLI'),
        createRows('KorSTS (한국어 의미 유사성 데이터)', 'Semantic Textual Similarity', 'https://github.com/kakaobrain/KorNLUDatasets/tree/master/KorSTS'),
        createRows('한국어 대화 데이터', 'Dialogue', 'https://aihub.or.kr/aidata/85'),
        createRows('NAVER NER (한국어 개체명 인식 데이터)', 'Named Entity Recognition', 'https://github.com/naver/nlp-challenge/issues/1'),
    ]

    useEffect(() => {
        isValidateToken(props)
    })
    
    const handleClick = (index) => {
        setIsOpen(isOpen.map((item, idx) => idx == index ? !item : item))
    }

    return (
        <div>
            <NavigationBar title={'ML/DL, 자연어처리 Roadmap'}/>
            <Container className={classes.articleContainer} maxWidth="md">
                <Typography className={classes.articleTitle} variant="h4">공부 로드맵</Typography>
                <Typography className={classes.articleBody} variant="body1">딥러닝 분야가 뜬지 오래되지 않아 공부 과정이나 용어가 정립되어 있지 않습니다. 이러한 점이 공부할 때 굉장히 혼란스러웠는데, 다른 분들도 비슷할 것 같습니다. 그래서 제게 도움이 되었던 방법과 자료를 공유드리려고 합니다. 저는 처음부터 자연어처리에 관심을 가지고 시작했기 때문에 Vision이나 추천 시스템 등 다른 분야에 대해 공부한 적이 없습니다. 그러나 공부하는 방법은 유사할 것이라 생각하므로, 자신의 관심 분야에 맞게 변형하여 적용해보시길 바랍니다.</Typography>
                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(0)}>{isOpen[0] ? <ArrowDropDown/> : <ArrowRight/>}공부 개요</Typography>
                <Collapse in={isOpen[0]}>
                    <Container>
                        <Typography variant="subtitle1">Bottom-Up</Typography>
                        <Typography className={classes.articleBody} variant="body1">기초 ML/DL/선형대수 강의 수강 → 자연어처리 공부 → 프로젝트, Pre-trained model 공부 → 세부 관심 분야 논문 읽고 구현</Typography>
                        <Typography variant="subtitle1">Top-Down</Typography>
                        <Typography className={classes.articleBody} variant="body1">프로젝트, Pre-trained model 공부 → 프로젝트 하면서 생긴 문제점을 논문을 읽고 구현하여 해결 → 하다가 모르는 부분 강의 수강, 찾아보기</Typography>
                        <Typography className={classes.articleBody} variant="body1">저는 아무것도 모르는 상태에서 학부연구생으로 연구실에 던져(?)졌기 때문에 Top-Down 방식으로 공부 했습니다. 이 방법의 장점은 실력이 매우 빠르게 향상된다는 점입니다. 가장 큰 단점은 체계가 없어 중구난방이 될 가능성이 크다는 것입니다. 사람마다 스타일이 다르기 때문에 나에게 맞는 방법으로 하시면 됩니다. 어떤 방식을 선택하든지 프로젝트를 완성하여 주목할 만한 성과를 내는 것이 중요합니다. </Typography>
                    </Container>
                </Collapse>

                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(1)}>{isOpen[1] ? <ArrowDropDown/> : <ArrowRight/>}ML/DL 기초 공부하는 방법</Typography>
                <Collapse in={isOpen[1]}>
                    <Container>
                        <Typography className={classes.articleBody} variant="body1">구글과 유튜브에 ML, DL 기초 내용이 수없이 많이 있습니다. 오히려 너무 많아서 어떤 방식으로 공부해야 하는지 감이 안 잡히는 것 같습니다. 제가 여러 방식으로 공부를 해보았는데, 공부 순서나 전달 방식만 조금 다를 뿐 세부 내용은 거의 동일했습니다. 그래서 제가 생각하기에 대표적이고, 깊이있게 공부할 수 있는 커리큘럼을 공유하려고 합니다. </Typography>
                        <Typography variant="h6"onClick={() => handleClick(13)}>{isOpen[13] ? <ArrowDropDown/> : <ArrowRight/>}Materials</Typography>
                        <Collapse in={isOpen[13]}>
                            <List>
                                <OpenTabLink 
                                    href={'https://www.youtube.com/watch?v=jGwO_UgTS7I&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU'} 
                                    youtube={'https://www.youtube.com/watch?v=jGwO_UgTS7I&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU'}
                                    description={'http://cs229.stanford.edu/syllabus-autumn2018.html'}>
                                        <ListItemText primary={'[Lecture] cs229: Machine Learning (Autumn 2018)'}/>
                                </OpenTabLink>
                                <OpenTabLink 
                                    href={'https://www.youtube.com/watch?v=vT1JzLTH4G4&list=PLC1qU-LWwrF64f4QKQT-Vg5Wr4qEE1Zxk&ab_channel=StanfordUniversitySchoolofEngineering'} 
                                    youtube={'https://www.youtube.com/watch?v=vT1JzLTH4G4&list=PLC1qU-LWwrF64f4QKQT-Vg5Wr4qEE1Zxk&ab_channel=StanfordUniversitySchoolofEngineering'}
                                    description={'http://cs231n.stanford.edu/2017/'}>
                                        <ListItemText primary={'[Lecture] cs231n: Convolutional Neural Networks for Visual Recognition (Spring 2017)'}/>
                                </OpenTabLink>
                                <OpenTabLink 
                                    href={'https://www.youtube.com/watch?v=0bMe_vCZo30&list=PL80I41oVxglKcAHllsU0txr3OuTTaWX2v&ab_channel=AlfredoCanziani'} 
                                    youtube={'https://www.youtube.com/watch?v=0bMe_vCZo30&list=PL80I41oVxglKcAHllsU0txr3OuTTaWX2v&ab_channel=AlfredoCanziani'}
                                    description={'https://atcold.github.io/pytorch-Deep-Learning/'}>
                                        <ListItemText primary={'[Lecture] NYU, Deep Learning (Spring 2020)'}/>
                                </OpenTabLink>
                                <OpenTabLink 
                                    href={'http://noiselab.ucsd.edu/ECE228/Murphy_Machine_Learning.pdf'} 
                                    description={'http://noiselab.ucsd.edu/ECE228/Murphy_Machine_Learning.pdf'}>
                                        <ListItemText primary={'[Textbook] Machine Learning: A Probabilistic Perspective'}/>
                                </OpenTabLink>
                                <OpenTabLink 
                                    href={'https://mml-book.github.io/book/mml-book.pdf'} 
                                    description={'https://mml-book.github.io/book/mml-book.pdf'}>
                                        <ListItemText primary={'[Textbook] Mathematics for Machine Learning'}/>
                                </OpenTabLink>
                            </List>
                        </Collapse>
                        <Typography style={{float: 'none'}} variant="h6" onClick={() => handleClick(14)}>{isOpen[14] ? <ArrowDropDown/> : <ArrowRight/>}Syllabus</Typography>
                        <Collapse in={isOpen[14]}>
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Course</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Tags</TableCell>
                                            <TableCell>Assignment Link</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {syllabusRows.map((item) => (
                                        <TableRow key={item.b}>
                                            <TableCell>{item.a}</TableCell>
                                            <TableCell>{item.b}</TableCell>
                                            <TableCell>{item.c}</TableCell>
                                            <TableCell><OpenTabLink description={item.d}/></TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Collapse>
                        <Typography className={classes.articleBody} variant="body1">제가 카이스트 AI 대학원에서 스터디를 할 때 따라갔던 커리큘럼입니다. ML/DL 에서 대표 강의인 스탠포드 대학의 cs229와 cs231n을 적절히 섞고, 최신 내용의 커버를 위해 NYC의 LeCun 교수님 강의도 조금 포함하였습니다. cs231n은 유튜브에 2017년도 강의까지만 공개되어 있어 해당년도 실라부스를 첨부했습니다. </Typography>
                        <Typography className={classes.articleBody} variant="body1">cs231n을 들을 때 과제도 같이 할 수 있도록 정리했습니다. 영상과 실라부스는 2017년도 강의이지만 해당년도의 과제 파일이 다운로드가 되지 않아, 2020년도 과제 링크를 첨부했습니다. 해설은 <StrongLink href={"https://github.com/jariasf/CS231n"} target={"_blank"}>여기</StrongLink> 있습니다.</Typography>
                        
                        <Typography className={classes.articleSectionTitle} variant="h6"onClick={() => handleClick(15)}>{isOpen[15] ? <ArrowDropDown/> : <ArrowRight/>}Problems</Typography>
                        <Typography className={classes.articleBody} variant="body1">위 커리큘럼으로 공부한 뒤 시험처럼 풀어볼 문제들입니다. 내가 제대로 이해한 게 맞는지 확인하는 용도로 사용해주세요. 출처는 cs230 midterm review 입니다. 왼쪽은 no solution, 오른쪽은 solution이 있는 문제 입니다.</Typography>
                        <Collapse in={isOpen[15]}>
                            <Grid container>
                                <Grid item xs={12} md={4} style={{display : 'flex'}}>
                                    <Typography style={{marginRight: '5px'}} variant='body1'>- Fall 2018 : </Typography>
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_fall18.pdf'} target={'_blank'}>Questions</StrongLink>/
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_fall18_soln.pdf'} target={'_blank'}>Answers</StrongLink>
                                </Grid>
                                <Grid item xs={12} md={4} style={{display : 'flex'}}>
                                    <Typography style={{marginRight: '5px'}} variant='body1'>- Winter 2019 : </Typography>
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_win19.pdf'} target={'_blank'}>Questions</StrongLink>/
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_win19_soln.pdf'} target={'_blank'}>Answers</StrongLink>
                                </Grid>
                                <Grid item xs={12} md={4} style={{display : 'flex'}}>
                                    <Typography style={{marginRight: '5px'}} variant='body1'>- Fall 2019 : </Typography>
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_fall19.pdf'} target={'_blank'}>Questions</StrongLink>/
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_fall19_soln.pdf'} target={'_blank'}>Answers</StrongLink>
                                </Grid>
                                <Grid item xs={12} md={4} style={{display : 'flex'}}>
                                    <Typography style={{marginRight: '5px'}} variant='body1'>- Winter 2020 : </Typography>
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_win20.pdf'} target={'_blank'}>Questions</StrongLink>/
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_win20_soln.pdf'} target={'_blank'}>Answers</StrongLink>
                                </Grid>
                                <Grid item xs={12} md={4} style={{display : 'flex'}}>
                                    <Typography style={{marginRight: '5px'}} variant='body1'>- Fall 2020 : </Typography>
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_fall20.pdf'} target={'_blank'}>Questions</StrongLink>/
                                    <StrongLink style={{marginRight: '5px'}} href={'https://cs230.stanford.edu/files/cs230exam_fall20_soln.pdf'} target={'_blank'}>Answers</StrongLink>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Container>
                </Collapse>
                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(2)}>{isOpen[2] ? <ArrowDropDown/> : <ArrowRight/>}자연어처리 공부하는 방법</Typography>
                <Collapse in={isOpen[2]}>
                    <Typography className={classes.articleBody} variant="body1">자연어처리 분야가 어떻게 구성되어 있는지, 어떤 순서로 공부하면 좋은지, 반드시 숙지해야 할 내용은 무엇인지 정리하였습니다. 또한 자연어처리를 공부하는 사람이라면 한번쯤은 읽어봤어야 할 논문들도 소개합니다.</Typography>
                    <Container>
                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(6)}>{isOpen[6] ? <ArrowDropDown/> : <ArrowRight/>}자연어처리 개요</Typography>
                        <Collapse in={isOpen[6]}>
                            <Typography className={classes.articleBody} variant="body1">자연어처리란, 단순히 얘기하면 인간이 사용하는 언어를 컴퓨터가 처리할 수 있도록 하는 일입니다. 컴퓨터를 활용하는 도메인으로서의 언어를 연구하는 것입니다. 자연어처리는 크게 두 가지 파트로 나누어 볼 수 있습니다. </Typography>
                            <img className={classes.img} src={"https://sogang-tree-dev.s3.ap-northeast-2.amazonaws.com/images/NLP_intro.png"} alt="NLP"></img>
                            <Typography variant="body2">출처: <StrongLink href={'https://woongsin94.tistory.com/341'}>https://woongsin94.tistory.com/341</StrongLink></Typography>
                            <Typography className={classes.articleBody} variant="body1">Natural Language Understanding과 Natural Language Generation입니다. NLU(자연어 이해)는 컴퓨터가 인간의 언어를 처리하기 쉽게끔 만드는 것이고, NLG(자연어 생성)은 컴퓨터가 인간의 언어를 생성하는 것입니다. 각 분야를 가볍게 살펴보시고, 내가 더 흥미로운 분야는 어떤 것인지 결정해서 더 깊게 공부하면 좋을 것 같습니다.</Typography>
                        </Collapse>
                        
                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(7)}>{isOpen[7] ? <ArrowDropDown/> : <ArrowRight/>}CS224n</Typography>
                        <Collapse in={isOpen[7]}>
                            <div style={{display: 'flex'}}>
                                <Typography style={{marginRight: '7px'}} variant="subtitle1">강의</Typography>
                                <OpenTabLink 
                                    youtube={'https://www.youtube.com/watch?v=8rXD5-xhemo&list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z'}
                                    description={'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/'}
                                    >
                                </OpenTabLink>
                                <Typography style={{marginRight: '7px'}} variant="subtitle1">과제 솔루션</Typography>
                                <OpenTabLink description={'https://github.com/daviddwlee84/Stanford-CS224n-NLP'}></OpenTabLink>
                            </div>

                            <Typography className={classes.articleBody} variant="body1">스탠포드의 자연어처리 강의인 cs224n입니다. 자연어처리의 큰 줄기를 훑는 내용이어서 반드시 한번은 다 보시길 추천드립니다. 저는 일주일에 2~3 강의씩 두 달에 걸쳐서 들었습니다. 내용이 쉽지 않으므로 방학을 이용하여 스터디를 하시면 좋을 것 같습니다. ML/DL과 마찬가지로 수업에 딸린 과제가 있고, 과제 솔루션 링크도 첨부합니다.</Typography>
                        </Collapse>
                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => {handleClick(8)}}>{isOpen[8] ? <ArrowDropDown/> : <ArrowRight/>}딥러닝을 이용한 자연어처리 입문</Typography>
                        <Collapse in={isOpen[8]}>
                            <StrongLink href={'https://wikidocs.net/book/2155'}>https://wikidocs.net/book/2155</StrongLink>
                            <Typography className={classes.articleBody} variant="body1">제가 자연어처리 분야를 공부하면서 가장 도움을 많이 받은 곳입니다. Top-down으로 공부를 한다면 수시로 찾아보며 공부하면 좋습니다. 저는 프로젝트를 하다가 모르는게 생기면 항상 이 사이트에서 기본 개념을 익히고, 구글에 검색하는 순서로 공부했습니다. bottom-up 방법을 사용한다면 다른 자료를 공부하기 전에 이 사이트를 처음부터 끝까지 한번 공부하는 걸 추천드립니다. 저는 pytorch 사용했기 때문에 실습은 따라하지 않았습니다.</Typography>
                        </Collapse>

                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => {handleClick(9)}}>{isOpen[9] ? <ArrowDropDown/> : <ArrowRight/>}반드시 알아야 하는 개념</Typography>
                        <Collapse in={isOpen[9]}>
                            <Container>
                                <Typography className={classes.articleBody} variant="body1">제가 생각했을 때 현재 시점에서 꼭 알아두면 좋을 개념들을 정리했습니다. 해당 개념들에 대해 읽어볼 수 있는 자료들을 첨부했고 제가 첨언하고 싶은 것을 간단하게 적었습니다.</Typography>
                                <Typography className={classes.articleSectionTitle} variant='subtitle1'>자연어처리의 흐름</Typography>
                                <Typography className={classes.articleBody} variant='body1'>AI기술을 보고 있자면 마치 컴퓨터 인간의 언어를 이해하는 것 같지만, 사실 컴퓨터는 숫자를 처리할 뿐입니다. 우리의 역할은 인간의 언어를 숫자로 표현해서 컴퓨터가 잘 이해할 수 있도록 하는 것입니다. 철자, 단어, 문장을 컴퓨터가 이해할 수 있도록 숫자로 이루어진 벡터로 변환하는 것을 임베딩이라고 합니다. 변환된 벡터는 임베딩 벡터라고 부릅니다. 결국 언어를 임베딩 공간으로 잘 보내는 기술이 관건이라고 할 수 있습니다. 더 좋은 임베딩을 생성하는 방향으로 자연어처리 분야가 발전하고 있다고 이해하면 좋을 것 같습니다. 이 내용에 대해 읽어보면 좋을 <StrongLink href={'https://ratsgo.github.io/natural%20language%20processing/2017/08/16/deepNLP/'} target={'_blank'}>자료</StrongLink>를 첨부합니다. 그리고 <StrongLink href={'https://ratsgo.github.io/natural%20language%20processing/2019/09/12/embedding/'} target={'_blank'}>한국어 임베딩</StrongLink> 이라는 책도 잘 정리되어 있습니다. </Typography>
                                <Typography className={classes.articleBody} variant="body1">좋은 임베딩을 만든 후에는 어떻게 해야할까요. 임베딩을 가지고 컴퓨터를 학습시켜야 합니다. 자연어처리 분야는 데이터가 가변적이고 이를 처리하기 위해 RNN 구조를 사용합니다. 그리고 RNN 구조의 단점을 해결하기 위해 LSTM, GRU, attention 구조, Transformer 등 여러 모델이 등장합니다. 따라서 모델 구조를 공부할 때는 이 모델이 앞선 모델의 어떤 문제점을 해결하고자 하였는지 파악하는 것이 중요합니다. 가령 attention을 공부할 때는, RNN, LSTM seq2seq 구조에서 Encoder의 정보가 context 벡터 하나로 전달 되어 정보가 손실되는 문제를, attention 구조를 통해 encoder의 정보를 계속 참조하도록 하여 해결했다는 점을 이해해야 한다는 말씀입니다. 이러한 흐름에 대한 질문을 제가 <StrongLink href={'https://www.sogangtree.ml/questions?tag=10'} target={'_blank'}>서강트리의 NLP 카테고리</StrongLink>에 아주 자세하게 정리했으니 꼭 스스로 공부해보시길 바랍니다.</Typography>
                                <Typography className={classes.articleSectionTitle} variant='subtitle1'>Transformer</Typography>
                                <Typography className={classes.articleBody} variant='body1'>자연어처리 분야는 Transformer가 등장한 이전과 이후로 나뉘는 것 같습니다. 이후 등장한 대규모의 모델들은 대부분 Transformer의 encoder와 decoder를 사용하고 있습니다. 예를 들어 BERT는 encoder단을, GPT는 decoder단을 활용합니다. 그렇기 때문에 Transformer의 구조를 이해하는 것은 너무나 중요합니다. 그리고, 면접에서 1순위 단골 질문입니다. Transformer를 설명한 자료는 구글에 수도 없이 많습니다. 그 중에 대표적인 <StrongLink href={'http://jalammar.github.io/illustrated-transformer/'} target={'_blank'}>자료</StrongLink>를 첨부합니다. 꼼꼼하게 잘 이해하고 제가 <StrongLink href={'https://www.sogangtree.ml/questions?tag=10'} target={'_blank'}>서강트리의 NLP 카테고리</StrongLink>에 정리한 Transformer 질문들에 답변해보세요. 바로 답변할 수 없다면, 다시 공부해야 합니다.</Typography>
                                <Typography className={classes.articleSectionTitle} variant='subtitle1'>Transfer learning</Typography>
                                <Typography className={classes.articleBody} variant='body1'><StrongLink href={'https://ruder.io/transfer-learning/'} target={'_blank'}>전이학습</StrongLink>이란, 기존에 학습된 모델을 이용하여 새로운 모델을 빠르게 학습시키는 방법입니다. 인간의 학습 방법과 굉장히 유사한 방식입니다. 예를 들어, 저희가 처음 C언어를 배울 때는 많은 양의 지식을 배우고 많은 시간을 들여야지만 이해할 수 있었습니다. 그러나 C언어에 익숙해지고 다른 프로그래밍 언어를 배울 때는, C언어를 배울 때보다 적은 공부량으로도 더 빠르게 학습할 수 있었을 거예요. 이는 축적되어 온 지식을 활용하여 이해하기 때문일 것입니다. 딥러닝에서도 마찬가지로, 아주 많은 양의 정보로 모델을 미리 학습시켜 놓는다면 그 모델을 활용하여 적은 양의 데이터로도 다른 문제를 손쉽게 풀 수 있도록 할 수 있지 않을까요? 많은 양의 정보로 학습한 모델을 사전 학습 모델, pre-trained 모델이라고 합니다. 그리고 익히 들어보셨을 fine tuning은 전이학습의 한 방법입니다.</Typography>
                                <Typography className={classes.articleBody} variant='body1'>자연어처리 분야에서는 처음 등장한 사전학습모델은 <StrongLink href={'http://jalammar.github.io/illustrated-bert/'} target={'_blank'}>BERT</StrongLink>입니다. BERT는 위키피디아의 대용량 데이터로 대형 모델을 긴 시간동안 학습시킨 모델입니다. 문장을 분류하는데 이 모델을 사용하고 싶다면, 모델의 출력단에 Fully connected layer 하나만 붙여놓고 소량의 데이터로 몇 번 더 학습시키면 끝납니다. 정확도가 한순간에 90% 이상으로 올라갔어요. BERT 등장 이후 연구자들이 더이상 뭘 연구해야 될지 모르겠다고 한탄하기도 했답니다. 이렇듯 딥러닝은 Transfer learning의 형태로 발전하고 있습니다. 앞으로도 계속 이러한 방향으로 발전할듯 하니, 어떤 개념인지 잘 공부하시면 좋겠습니다.</Typography>
                                <Typography className={classes.articleSectionTitle} variant='subtitle1'>Traning objective의 변화</Typography>
                                <Typography className={classes.articleBody} variant='body1'>위에서 전이학습을 설명하면서, 전이학습을 위해서는 대용량의 데이터로 미리 학습한 사전학습모델이 있어야 한다고 말씀드렸습니다. 사전 학습은 데이터 자체가 스스로 정답이 되는 self-supervised learning입니다. 즉, 사람이 답을 만들어 줄 필요없이 데이터만 모델에 입력하면 모델 스스로 데이터에 대해 학습한다는 말입니다. 단, 모델이 스스로 학습할 수 있도록 문제를 만들어 줘야 하는데 이 문제를 training objective라고 합니다.</Typography>
                                <Typography className={classes.articleBody} variant='body1'>BERT를 예로 들어보겠습니다. BERT의 training objective는 두 개입니다. 하나는 Masked Language Model(MLM)이고, 다른 하나는 Next Sentence Prediction(NSP)입니다. MLM은 전체 토큰의 15%를 마스킹하고 모델이 마스킹 된 위치에 원래 단어가 무엇이었는지 예측하도록 하는 문제입니다. 수능 영어 문제에서 빈칸 추론 문제와 같다고 생각하시면 됩니다. NSP는 두 문장이 있을 때 두 문장이 이어지는 문장인지 판단하는 문제입니다. BERT는 MLM과 NSP를 푸는 과정을 통해 문장을 학습하고, 문장 간의 관계도 파악하게 되는 것입니다. </Typography>
                                <Typography className={classes.articleBody} variant='body1'>모델의 크기가 커진 후로, 모델의 구조를 복잡하게 만들어 성능을 올리는데는 한계가 있기 때문에 결국 어떤 training objective를 선택하는지가 모델 구성에 크게 영향을 미칩니다. BERT 이후 많은 모델이 등장하면서 training objective도 계속 변화하고 있습니다. 그 trend를 주시하고 있어야 연구에서 혹은 현업에서도 기민하게 대응할 수 있을 것입니다. 그렇기 때문에 training objective의 변화는 면접에서도 큰 비중으로 물어봅니다. 타 대학원에서 진행한 내용이지만, 잘 정리되어 있는 세미나 자료를  첨부하니 제시된 논문들도 한번씩 훑어보시길 추천 드립니다.</Typography>
                                <OpenTabLink youtube={'https://www.youtube.com/watch?v=v7diENO2mEA&feature=youtu.be'} description={'http://dsba.korea.ac.kr/seminar/?mod=document&uid=247'}/>
                            </Container>
                        </Collapse>

                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(10)}>{isOpen[10] ? <ArrowDropDown/> : <ArrowRight/>}반드시 읽어야 하는 논문</Typography>
                        <Collapse in={isOpen[10]}>
                            <Typography className={classes.articleBody} variant="body1">다른 CS 분야와는 다르게 ML/DL 분야는 빠르게 변화하고 있고, 한편의 논문이 큰 파장을 불러일으키는 경우가 많습니다. 그리고 ML/DL 기술을 연구하고 적용하는 방법이 정형화 되어 있지 않기 때문에 늘 연구자들이 어떤 방향성을 가지고 있는지 늘 파악해야 합니다.  그래서 이 분야에서 계속 연구하고, 일하고 싶다면 논문을 읽는 것을 생활화 해야 합니다. </Typography>
                            <Typography className={classes.articleBody} variant='body1'>먼저, 앞서 언급한 자연어처리의 흐름을 따라가며 공부할 때 같이 읽으면 좋을 논문들부터 소개합니다. 이 다섯개의 논문들 중에서도 반드시 읽어야 할 단 하나의 논문을 꼽으라고 한다면, 저는 Attention Is All You Need를 고르겠습니다. 이 논문은 Transformer를 소개한 논문입니다. 앞서도 말씀드렸지만, Transformer가 공개된 후로 자연어처리 분야는 완전히 새로운 길로 나아가게 됩니다. 현재는 자연어처리 분야뿐만 아니라 비전 등 다른 분야에서도 활발히 이용되고 있습니다. 그렇기 때문에 어렵더라도 반드시 읽고 이해해주세요.</Typography>
                            <Typography style={{float: 'none'}} variant="h6" onClick={() => handleClick(16)}>{isOpen[16] ? <ArrowDropDown/> : <ArrowRight/>}Papers</Typography>
                                <Collapse in={isOpen[16]}>
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Title</TableCell>
                                                    {/* <TableCell>Date</TableCell> */}
                                                    <TableCell>Keyword</TableCell>
                                                    <TableCell>Link</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {paperRows.map((item) => (
                                                <TableRow key={item.a}>
                                                    <TableCell>{item.a}</TableCell>
                                                    {/* <TableCell>{item.b}</TableCell> */}
                                                    <TableCell>{item.c}</TableCell>
                                                    <TableCell><OpenTabLink description={item.d}/></TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Collapse>
                            <Typography className={classes.articleBody} variant="body1">자연어처리 분야의 트렌드는 Major 국제 컨퍼런스에 제출되는 논문들을 살펴보며 파악할 수 있습니다. 이는 자연어처리 분야 뿐만 아니라 다른 딥러닝 분야도 마찬가지입니다. AI, 딥러닝, 자연어처리 분야에서 가장 유명한 컨퍼런스의 웹사이트를 정리해보았습니다. Accepted Papers 리스트에서 내가 관심있는 주제로 검색을 하시고, Best Paper Awards 를 받은 논문도 살펴보세요. 아직 2021 컨퍼런스가 진행되지 않아서, 2020년도부터 살펴보시면 됩니다. 구글에서 관심있는 컨퍼런스 + trend, hot topic, review 등으로 검색하면 사람들이 컨퍼런스를 보고 정리해놓은 자료도 찾을 수 있습니다. 너무 방대한 양이 부담스러우시다면 그런 자료로 먼저 시작하는 것도 좋을 것 같습니다.</Typography>
                            <List>
                                <ListItem><OpenTabLink href={'https://iclr.cc/'}>ICLR: The International Conference on Learning Representations</OpenTabLink></ListItem>
                                <ListItem><OpenTabLink href={'https://nips.cc/'}>NeurIPS: The Neural Information Processing Systems</OpenTabLink></ListItem>
                                <ListItem><OpenTabLink href={'https://www.aclweb.org/anthology/'}>ACL: The Association for Computational Linguistics</OpenTabLink></ListItem>
                                <ListItem><OpenTabLink href={'https://2020.emnlp.org/papers/main'}>EMNLP: Empirical Methods in Natural Language Processing</OpenTabLink></ListItem>
                                <ListItem><OpenTabLink href={'https://aaai.org/Conferences/conferences.php'}>AAAI: the Association for the Advancement of Artificial Intelligence</OpenTabLink></ListItem>
                                <ListItem><OpenTabLink href={'https://icml.cc/'}>ICML: International Conference on Machine Learning</OpenTabLink></ListItem>
                            </List>
                            <Typography className={classes.articleBody} variant='body1'>내가 하는 프로젝트에서 필요한 정보 등, 좀 더 구체적인 논문을 찾고 싶다면 <StrongLink href={'https://scholar.google.com/'} target={'_blank'}>Google Scholar</StrongLink> 에서 검색해보세요. 제가 검색했던 예시들입니다.</Typography>
                            <List>
                                <ListItemText primary={'BERT domain adaptation'}/>
                                <ListItemText primary={'data augmentation NLP'}/>
                                <ListItemText primary={'bert sentiment analysis'}/>
                                <ListItemText primary={'sentiment analysis domain adaptation'}/>
                                <ListItemText primary={'hierarchy transformer dialogue'}/>
                            </List>
                            <Typography className={classes.articleBody} variant='body1'>이런 식으로 내가 찾고 싶은 내용과 반드시 들어가야 하는 키워드를 조합하여 검색하고, 검색 결과에서 피인용수가 높은 논문들부터 읽었습니다. 대부분의 논문들은 공개 되어 있으나, 가끔씩 유료로 읽어야 되는 논문들도 있었는데 이럴 때는 로욜라 도서관 홈페이지를 이용했습니다. 읽고 싶은 논문 제목을 복사하여 로욜라에서 검색하면 무료로 열람하고 다운로드 받을 수 있습니다.</Typography>
                        </Collapse>
                    </Container>
                </Collapse>
                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(5)}>{isOpen[5] ? <ArrowDropDown/> : <ArrowRight/>}논문 정리하는 방법</Typography>
                    <Collapse in={isOpen[5]}>
                        <Typography className={classes.articleBody} variant="body1">읽은 논문을 정리하는 습관을 가지면 후에 큰 도움이 됩니다. 논문 정리글을 쓰는 것이 가장 좋지만 여의치 않은 경우 표를 만들어서 간단하게 정리해도 괜찮습니다. 저는 구글 스프레드시트를 이용했는데, 노션 등 자신이 편한 툴을 이용해서 작성해보세요. 표에는 Title, Date, Venue, Keywords, Summary, Link 등을 정리합니다. 특히 Summary에 논문을 읽고 본인만의 언어로 한두줄 정도 정리하면, 기억에 훨씬 오래 남습니다. 나중에 면접에서 읽은 논문에 대한 질문을 받을 때도 이를 바탕으로 답변해보시길 바랍니다.</Typography>
                        <img className={classes.imgHorizontal} src={"https://sogang-tree-dev.s3.ap-northeast-2.amazonaws.com/images/jaeyoon01.png"} alt="NLP"></img>
                        <Typography className={classes.articleBody} variant="body1">논문을 읽고 블로그 등에 정리할 때는 다음과 같이 정리하면 좋습니다.</Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">1. 이 논문이 기여한 점, 어떤 문제를 해결하고자 하였는지?</Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">2. 이 논문에서 제시하는 모델</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">- 모델 구조를 figure와 함께 제시</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">- 모델의 input과 output</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">- 수식</Typography>
                        
                        <Typography className={classes.articleOrderedList} variant="body1">3. 실험 환경, 방법</Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">4. 실험 결과</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">- 성능 비교 표, 그래프</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">- 다른 모델과 비교해서 어떤 점이 뛰어난가?</Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">5. 본인의 느낌</Typography><br/>


                        <Typography className={classes.articleBody} variant="body1">간단하게 예시를 들어보겠습니다.</Typography>
                        <Typography variant="body1"><StrongLink href={'https://openreview.net/pdf?id=r1xMH1BtvB'} target={'_blank'}>ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators</StrongLink></Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">1. 기여한 점: 기존 MLM은 15%의 토큰만 마스킹 하여 전체 문맥을 학습하는데 비효율적, 반면 우리 모델은 바뀐 토큰을 예측하게 하여 적은 데이터와, 파라미터, 적은 시간으로 효율적인 학습, 그럼에도 SOTA 달성. </Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">2. 제시 모델: Generator + Discriminator</Typography>
                        
                        <img className={classes.imgRectangular} src={"https://sogang-tree-dev.s3.ap-northeast-2.amazonaws.com/images/jaeyoon02.png"} alt="NLP"></img>
                        <Typography className={classes.articleOrderedList} variant="body1">(모델 수식 첨부하고 설명~~ 생략)</Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">3. 실험 환경, 방법: Weight sharing 실험 설명, small generator로 세팅한 이유 설명 (생략)</Typography>
                        <Typography className={classes.articleOrderedList} variant="body1">4. 실험결과: </Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">ELECTRA-Small의 경우 1대의 gpu에서 4일만에 학습되었고 GPT 모델보다 뛰어난 성능을 보임. ELECTRA-Large 모델은 RoBERTa에서 사용한 컴퓨팅 자원의 1/4를 사용하였을 때 동일한 성능을 보임.</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">ELECTRA-Small은 작은 크기에도 불구하고 우수한 성능, ELECTRA-Base는 BERT-Base, BERT-Large보다 높은 성능을 보임.</Typography>
                        
                        <img className={classes.img} src={"https://sogang-tree-dev.s3.ap-northeast-2.amazonaws.com/images/jaeyoon03.png"} alt="NLP"></img>
                        <img className={classes.img} src={"https://sogang-tree-dev.s3.ap-northeast-2.amazonaws.com/images/jaeyoon04.png"} alt="NLP"></img>
                        <Typography className={classes.articleOrderedList} variant="body1">5. 느낀 점: Training objective의 변화만으로 학습 자원의 큰 감소를 가지고 올 수 있다는 점이 흥미로움. ELECTRA 모델 구조를 Multi-modal, Multi-task learning에 사용할 수 있을까?</Typography>
                        <Typography className={classes.articleBody} variant='body1'>이런식으로 정리하다 보면 눈으로만 읽었을 때보다 훨씬 잘 이해되는 것을 느낄 수 있을 거예요.</Typography>
                    </Collapse>
                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(3)}>{isOpen[3] ? <ArrowDropDown/> : <ArrowRight/>}프로젝트 하는 방법</Typography>
                <Collapse in={isOpen[3]}>
                    <Container>
                        <Typography className={classes.articleBody} variant="body1">프로젝트는 가장 간단한 것부터 시작하세요. 어려운 주제, 어려운 데이터로 시작하면 주목할만한 성과를 내기 어려울 뿐더러 쉽게 싫증을 느끼게 됩니다. 구글에 검색했을 때 이미 많은 사람들이 시도한 재료를 가지고 첫 프로젝트를 시작하는게 좋습니다. 다음 표에 자연어처리 각 분야에서 널리 알려진 데이터 셋을 정리했습니다.</Typography>
                        <Typography style={{float: 'none'}} variant="h6" onClick={() => handleClick(18)}>{isOpen[18] ? <ArrowDropDown/> : <ArrowRight/>}NLP 데이터 종류</Typography>
                        <Collapse in={isOpen[18]}>
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>데이터 종류</TableCell>
                                            <TableCell>Keyword</TableCell>
                                            <TableCell>Github Link</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {projectRows.map((item) => (
                                        <TableRow key={item.a}>
                                            <TableCell>{item.a}</TableCell>
                                            <TableCell>{item.b}</TableCell>
                                            <TableCell><OpenTabLink github={item.c}/></TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Collapse>
                        <Typography className={classes.articleBody} variant="body1">이 중에서 제가 추천하는 데이터는 네이버 영화 리뷰 데이터입니다. Github에 찾아보시면 이 데이터를 사용한 레포지토리가 매우 많아서 참고하기 좋습니다. 또한 새로운 한국어 훈련 모델이 나올때마다 NSMC 데이터로 성능 비교를 하므로 내가 한 프로젝트가 어느 정도 성능을 보이는지 객관적인 평가가 가능합니다. 이때 반드시 Github에 commit을 하며 프로젝트를 진행해야 합니다. Github 사용법은 아래에 정리했으니 참고하세요.</Typography>
                        <Typography className={classes.articleBody} variant="body1">쉬운 프로젝트로 감을 익힌 후에는 내가 관심 있는 세부 분야를 찾아야 합니다. 그리고 해당 분야의 문제점은 무엇인지, 연구자들이 이를 해결하기 위하여 어떤 노력을 하고 있는지 논문을 살펴보아야 합니다. 최신 논문, 피인용 수가 많은 논문, 최우수 논문 등 여러가지 기준을 놓고 논문을 찾으세요. 그리고 논문에서 말하는 바를 스스로 구현해보세요. 꼭 논문이 아니더라도 구글에 검색하여 나오는 정보를 적용하는 것도 중요합니다.</Typography>
                        <Typography className={classes.articleBody} variant="body1">저의 예시를 들어보겠습니다. 저는 연구실에서 Classification과 Machine Translation에 관련된 일을 했습니다. 기업이 아닌 이상 딥러닝에서 가장 큰 문제는 부족한 데이터와 학습 자원일 수밖에 없습니다. 양질의 데이터가 너무 적고, 학습할 서버의 용량도 적습니다. 그래서 저는 먼저 Data augmentation 관련 논문을 많이 읽었습니다. 그 중에서 제가 이해할 수 있고, 논문 코드가 공개된 것을 우선으로 선정하여 구현하였습니다. 또한 학습 자원을 최대한 활용하기 위해 Multi-GPU 학습 방법을 찾아 적용하였습니다.</Typography>
                        
                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(11)}>{isOpen[11] ? <ArrowDropDown/> : <ArrowRight/>}Github 활용 방법</Typography>
                        <Collapse in={isOpen[11]}>
                            <Typography className={classes.articleBody} variant="body1">Git 사용 여부가 취업 과정에서 중요하게 작용했던 것 같습니다. 팀 프로젝트를 진행했다면 반드시 협업 과정을 남겨 보여주는 것이 좋고, 개인 프로젝트라도 issue 중심으로 커밋을 기록하면 좋습니다. 아래는 제가 git을 처음 이용할 때 참고했던 블로그들입니다. </Typography>
                            <List>
                                <ListItem><StrongLink href={'https://www.huskyhoochu.com/issue-based-version-control-201/'}>github 하나로 1인 개발 워크플로우 완성하기: 실전 편</StrongLink></ListItem>
                                <ListItem><StrongLink href={'https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html'}>[GitHub] Git 브랜치의 종류 및 사용법 (5가지)</StrongLink></ListItem>
                                <ListItem><StrongLink href={'https://gmlwjd9405.github.io/2018/05/12/how-to-collaborate-on-GitHub-3.html'}>[GitHub] GitHub로 협업하는 방법[3] - Gitflow Workflow</StrongLink></ListItem>
                                <ListItem><StrongLink href={'https://blog.ull.im/engineering/2019/03/10/logs-on-git.html'}>좋은 git commit 메시지를 위한 영어 사전</StrongLink></ListItem>
                            </List>
                            <Typography className={classes.articleBody} variant="body1">저는 gitflow workflow를 표준으로 삼아 프로젝트를 관리하였습니다. master branch와 dev branch를 분리하고, issue 중심으로 dev에서 branch를 딴 후 merge하고, release 브랜치를 만들어 버전관리를 했습니다.</Typography>
                            <Typography className={classes.articleBody} variant="body1">서류과정에서 github 링크를 제출하였고, 특정 코드를 왜 그렇게 작성하였는지, 면접 전 살펴보았을 때 어느 정도 수준인 것 같은데 혹시 이 정도의 개발도 가능한지 등 관련 질문을 많이 받았습니다. 입사해서도 보니 git 관리 능력은 필수인 것 같습니다. Pr을 날리고 코드 리뷰를 하는 과정에 익숙해지면 좋을 것 같습니다. 가능하다면 github action등을 이용한 cI/cd 도 경험해보세요.</Typography>
                        </Collapse>

                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(12)}>{isOpen[12] ? <ArrowDropDown/> : <ArrowRight/>}Pytorch 공부</Typography>
                        <Collapse in={isOpen[12]}>
                            <Typography className={classes.articleBody} variant="body1">딥러닝을 위한 프레임워크로는 Tensorflow와 Pytorch가 있습니다. 두 프레임워크는 통상적으로 실제 서비스에 서빙을 할 것인지, 연구를 할 것인지에 따라 선택합니다. Tensorflow는 서빙에, Pytorch는 연구에 장점이 있습니다. 그 이유를 간단히 설명드리겠습니다. Tensorflow는 static graph를 구축하고 Pytorch는 dynamic graph를 구축합니다. Tensorflow는 모델을 빌드할 때 해당 모델의 computational graph를 완전히 빌드하여 이를 계속 사용합니다. 그렇기 때문에 original python code에 대한 접근 없이도 구동할 수 있고, C++환경 위에서 손쉽게 import하여 사용할 수 있습니다. 반면 Pytorch는 매 iteration마다 새로운 computatinal graph를 생성합니다. 그리고 계산 시에는 C++단에서 계산하고 계산의 결과는 python code단으로 보내 처리합니다. 그렇기 때문에 iteration 중간에 모델 구조를 변경하는 등 유연하게 처리가 가능합니다. 저는 학부연구생일 때 Pytorch를 공부하였는데 입사하고 나서 Tensorflow를 다시 배우고 있습니다😭</Typography>
                            <Typography className={classes.articleBody} variant="body1">Pytorch를 익힐 때 먼저 <StrongLink href={'https://pytorch.org/'} target={'_blank'}>공식 tutorial</StrongLink>부터 따라해보세요. 그리고 저는 <StrongLink href={'https://github.com/bentrevett/pytorch-seq2seq'} target={'_blank'}>github 레포지토리</StrongLink>에서 transformer seq2seq 구조를 익혔습니다. Jupyter Notebook으로 정리가 매우 잘 되어 있어서 하나씩 따라해보기 좋습니다. seq2seq 레포지토리뿐만 아니라 sentiment analysis 등의 다른 주제도 있으니 내가 관심있는 것을 선택하세요. 코드 한줄 한줄마다 어떤 결과값이 나오는지, Tensor shape은 어떻게 변경 되는지 꼭 확인하면서 따라가세요. 딥러닝의 코드 구현은 데이터를 잘 짜맞춰서 레이어를 통과시키는 문제이기 때문에 데이터의 shape을 파악하는 것이 중요합니다. 코드는 레고 블럭이라고 생각하세요. 원하는 모양대로 쌓아올리면 그만입니다. 내가 쌓은 블럭에 어떤 데이터가 들어가서 어떤 값이 나오는지가 중요합니다.</Typography>
                            <Typography className={classes.articleBody} variant="body1">Pre-trained 모델을 사용할 시기가 오면, huggingface transformers 라이브러리를 살펴보셔야 합니다. <StrongLink href={'https://huggingface.co/transformers/index.html'} target={'_blank'}>공식 다큐멘트</StrongLink>가 매우 잘 정리되어 있으므로 즐겨찾기 해놓고 읽으시면 좋습니다. 이때도 Parameters와 Returns값으로 어떤 형태의 데이터가 오고 가는지 파악하는게 중요합니다. 여유가 있다면, 소스 코드로 들어가서 어떻게 구현이 되어있는지 타고 올라가며 이해해보세요.</Typography>
                            <Typography className={classes.articleBody} variant="body1">Pytorch는 학습 시 custom training loop을 이용합니다. Tensorflow keras에서 model.fit으로 학습을 해결하는 것과는 조금 다릅니다. BERT 등 모델의 학습 코드 예시를 다음 링크에서 확인해보세요. <StrongLink href={'https://github.com/huggingface/transformers/blob/master/examples/text-classification/run_glue.py'} target={'_blank'}>Pytorch 공식 Github의 example/text-classification/run_glue.py</StrongLink>입니다. 그리고 저는 프로젝트에서 KcBERT를 주로 이용하는데, <StrongLink href={'https://github.com/Beomi/KcBERT-Finetune/blob/master/run_seq_cls.py'} target={'_blank'}>저자의 finetuning 코드</StrongLink>를 많이 참조했습니다.</Typography>
                        </Collapse>
                    </Container>
                </Collapse>
                

                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(4)}>{isOpen[4] ? <ArrowDropDown/> : <ArrowRight/>}선형대수 공부하는 방법</Typography>
                <Collapse in={isOpen[4]}>
                    <Container>
                        <Typography className={classes.articleBody} variant="body1">저는 수학과의 선형대수학 강의로 처음 공부했습니다. 그런데 시간이 부족해서 뒷부분에 특이값 분해 등의 내용을 배우지 못해서 따로 더 공부했습니다. 학교에서 Gilbert Strang 교수님의 Introduction to Linear Algebra 교재로 공부했고, 따로 공부할 때도 해당 강의를 먼저 들었습니다. 강의는 <StrongLink href={'https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/video-lectures/'} target={'_blank'}>여기</StrongLink>에서 확인할 수 있습니다.</Typography>
                        <Typography className={classes.articleBody} variant="body1">David C. Lay 교수님의 <StrongLink href={'https://math.berkeley.edu/~yonah/files/Linear%20Algebra.pdf'}>Linear Algebra and its applications 교재</StrongLink>는 위의 교재보다 좀 더 응용 문제가 많아서 문제를 풀어보기에 좋습니다. 그리고 동치인 statement들(예를 들어 invertible matrix에 대해)을 모아서 제시해줘서 더 직관적으로 생각할 수 있었습니다. 위 강의를 들으며 개념을 익히고 이 교재에 있는 문제를 푸는 식으로 공부해보세요.</Typography>
                        
                    </Container>
                </Collapse>

                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(17)}>{isOpen[17] ? <ArrowDropDown/> : <ArrowRight/>}서강대학교 이수과목</Typography>
                <Collapse in={isOpen[17]}>
                    <Container>
                        <Typography className={classes.articleBody} variant="body1">CS와 수학, 통계학 관련해서 이수한 과목들 알려 드립니다. 많은 도움이 됐다고 생각한 과목에 볼드 처리 했습니다.</Typography>
                        <Typography variant="subtitle1">CS</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">기초C언어, 데이터베이스입문, 기초JAVA언어, <strong>기초빅데이터프로그래밍, 자료구조입문, 알고리즘입문</strong></Typography>
                        <Typography variant="subtitle1">수학, 통계</Typography>
                        <Typography className={classes.articleUnorderedList} variant="body1">경영통계학, <strong>선형대수학, 계량경제학,</strong>  고등미적분학, <strong>응용경영통계</strong></Typography>
                    </Container>
                </Collapse>

                <Typography className={classes.articleSectionTitle} variant="h5" >맺으며</Typography>
                <Container>
                    <Typography className={classes.articleBody} variant="body1">저는 2019년 9월부터 학부연구생을 시작하면서 파이썬을 공부했고, 2020년 1월부터 딥러닝을 시작했습니다. 그때가 4학년 1학기였어요. 지금 이 글을 보시는 분들 중에 고학년에 올라와서 이쪽 분야에 관심을 가진 분들도 계실 거예요. 너무 늦은건 아닐까 불안한 마음을 가지고 있을 거라 생각합니다. 저도 똑같은 마음이었습니다. 그런데 그 때 친구가 해줬던 말이 있어요. "해보지 않고서 불안해 하지 말고 일단 시작부터 해." 저는 이 말을 들은 다음날 연구실에 컨택해서 연구생 생활을 시작했습니다. 해보지 않으면 몰라요. 그러니 꼭 도전해보시길 바랍니다.</Typography>
                    <Typography className={classes.articleBody} variant="body1">질문이 있으시다면 언제든지 sogang-tree@naver.com으로 보내주세요. 가능한 빠르게 답변 드리도록 하겠습니다. 긴 글 읽어주셔서 감사합니다.</Typography>
                </Container>

                <Typography style={{marginBottom: '50px'}} align={'right'} variant="subtitle1">Written By. 천재윤</Typography>
            </Container>
        </div>
    )
}

const OpenTabLink = (props) => {
    return (
        <div style={{display: 'flex'}}>
            {props.href && <Link style={{float: 'left', marginRight:'10px'}} href={props.href} target={'_blank'}>{props.children}</Link>}
            {props.youtube && <Link style={{float: 'left', marginRight:'10px'}} href={props.youtube} target={'_blank'}><Movie/></Link>}
            {props.github && <Link style={{float: 'left', marginRight:'10px'}} href={props.github} target={'_blank'}><Code/></Link>}
            {props.description && <Link style={{float: 'left', marginRight:'10px'}} href={props.description} target={'_blank'}><Description/></Link>}
            {props.link && <Link style={{float: 'left', marginRight:'10px'}} href={props.link} target={'_blank'}><InsertLink/></Link>}
            <br />
        </div>
    )
}

const StrongLink = (props) => {
    return <strong><Link href={props.href} target={props.target}>{props.children}</Link></strong>
}

export default withRouter(JaeyoonArticle)