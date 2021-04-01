import { Collapse, Container, createStyles, Link, List, ListItemText, makeStyles, Table, Typography } from "@material-ui/core";
import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
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
    img: {
        height: 300,
        [theme.breakpoints.down('xs')]: {
            height: 50,
        }
    }
}))
const JaeyoonArticle = (props) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState([false, false, false, false, false, false, false, false, false, false,
                                            false, false, false]);
    
    useEffect(() => {
        isValidateToken(props)
    })
    
    const handleClick = (index) => {
        setIsOpen(isOpen.map((item, idx) => idx == index ? !item : item))
        console.log(isOpen[index]);
    }

    return (
        <div>
            <NavigationBar title={'ML/DL, 자연어처리 Roadmap'}/>
            <Container className={classes.articleContainer} maxWidth="md">
                <Typography className={classes.articleTitle} variant="h4">공부 로드맵</Typography>
                <Typography align={'right'} variant="subtitle1">아텍 15 천재윤</Typography>
                <Typography className={classes.articleBody} variant="body1">딥러닝 분야가 뜬지 오래되지 않아 스탠다드한 공부 과정이나 용어가 정립되어 있지 않습니다. 이러한 점이 공부할 때 굉장히 혼란스러웠는데, 다른 분들도 비슷할 것 같습니다.</Typography>
                <Typography className={classes.articleBody} variant="body1">그래서 제게 도움이 되었던 방법과 자료를 공유드리려고 합니다. 저는 처음부터 자연어처리에 관심을 가지고 시작했기 때문에 Vision이나 추천 시스템 등 다른 분야에 대해 공부한 적이 없습니다. 그러나 공부하는 방법은 유사할 것이라 생각하므로, 자신의 관심 분야에 맞게 변형하여 적용해보시길 바랍니다.</Typography>
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
                        {/* <Table>
                            Materials
                        </Table>
                        <Table>
                            Syllabus
                        </Table> */}
                        <Typography className={classes.articleBody} variant="body1">제가 카이스트 AI 대학원에서 스터디를 할 때 따라갔던 커리큘럼입니다. ML/DL 에서 대표 강의인 스탠포드 대학의 cs229와 cs231n을 적절히 섞고, 최신 내용의 커버를 위해 NYC의 LeCun 교수님 강의도 조금 포함하였습니다. cs231n은 유튜브에 2017년도 강의까지만 공개되어 있어 해당년도 실라부스를 첨부했습니다. </Typography>
                        <Typography className={classes.articleBody} variant="body1">cs231n을 들을 때 과제도 같이 할 수 있도록 정리했습니다. 영상과 실라부스는 2017년도 강의이지만 해당년도의 과제 파일이 다운로드가 되지 않아, 2020년도 과제 링크를 첨부했습니다. 아래 링크는 솔루션입니다.</Typography>
                        <Link href={"https://github.com/jariasf/CS231n"}>Solutions</Link>
                        <Typography className={classes.articleSectionTitle} variant="h6">Problems</Typography>
                        {/* <Table>

                        </Table> */}
                        {/* <Container>
                            <Typography variant="subtitle1">
                                Fall 2018 
                                <Link href={"https://cs230.stanford.edu/files/cs230exam_fall18.pdf"}>Questions </Link>
                                <Link href={"https://cs230.stanford.edu/files/cs230exam_fall18_soln.pdf"}>Answers</Link>
                            </Typography>
                        </Container> */}
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
                            <Typography variant="body2">출처: <Link href={'https://woongsin94.tistory.com/341'}>https://woongsin94.tistory.com/341</Link></Typography>
                            <Typography className={classes.articleBody} variant="body1">Natural Language Understanding과 Natural Language Generation입니다. NLU(자연어 이해)는 컴퓨터가 인간의 언어를 처리하기 쉽게끔 만드는 것이고, NLG(자연어 생성)은 컴퓨터가 인간의 언어를 생성하는 것입니다. 각 분야를 가볍게 살펴보시고, 내가 더 흥미로운 분야는 어떤 것인지 결정해서 더 깊게 공부하면 좋을 것 같습니다.</Typography>
                        </Collapse>
                        
                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(7)}>{isOpen[7] ? <ArrowDropDown/> : <ArrowRight/>}CS224n</Typography>
                        <Collapse in={isOpen[7]}>
                            <Typography variant="subtitle1">강의</Typography>
                            <Link href={'https://www.youtube.com/watch?v=8rXD5-xhemo&list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z'}>강의 영상</Link><br/>
                            <Link href={'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/'}>강의 실라부스</Link><br/>
                            <Typography variant="subtitle1">과제 솔루션</Typography>
                            <Link href={'https://github.com/daviddwlee84/Stanford-CS224n-NLP'}>https://github.com/daviddwlee84/Stanford-CS224n-NLP</Link>
                            <Typography className={classes.articleBody} variant="body1">스탠포드의 자연어처리 강의인 cs224n입니다. 자연어처리의 큰 줄기를 훑는 내용이어서 반드시 한번은 다 보시길 추천드립니다. 저는 일주일에 <strong>2~3 강의씩 두 달</strong>에 걸쳐서 들었습니다. 내용이 쉽지 않으므로 방학을 이용하여 스터디를 하시면 좋을 것 같습니다. ML/DL과 마찬가지로 수업에 딸린 과제가 있고, 과제 솔루션 링크도 첨부합니다.</Typography>
                        </Collapse>
                        
                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => {handleClick(8)}}>{isOpen[8] ? <ArrowDropDown/> : <ArrowRight/>}딥러닝을 이용한 자연어처리 입문</Typography>
                        <Collapse in={isOpen[8]}>
                            <Link href={'https://wikidocs.net/book/2155'}>https://wikidocs.net/book/2155</Link>
                            <Typography className={classes.articleBody} variant="body1">제가 자연어처리 분야를 공부하면서 가장 도움을 많이 받은 곳입니다. Top-down으로 공부를 한다면 수시로 찾아보며 공부하면 좋습니다. 저는 프로젝트를 하다가 모르는게 생기면 항상 이 사이트에서 기본 개념을 익히고, 구글에 검색하는 순서로 공부했습니다. bottom-up 방법을 사용한다면 다른 자료를 공부하기 전에 이 사이트를 처음부터 끝까지 한번 공부하는 걸 추천드립니다. 저는 pytorch 사용했기 때문에 실습은 따라하지 않았습니다.</Typography>
                        </Collapse>

                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => {handleClick(9)}}>{isOpen[9] ? <ArrowDropDown/> : <ArrowRight/>}반드시 알아야 하는 개념</Typography>
                        <Collapse in={isOpen[9]}>
                            <Typography className={classes.articleBody} variant="body1">제가 생각했을 때 현재 시점에서 꼭 알아두면 좋을 개념들을 정리했습니다. 해당 개념들에 대해 읽어볼 수 있는 자료들을 첨부했고 제가 첨언하고 싶은 것을 간단하게 적었습니다.</Typography>
                            <List>
                                <ListItemText>딥러닝의 확대 후 자연어처리의 흐름</ListItemText>
                                <ListItemText>Transformer</ListItemText>
                                <ListItemText>Transfer learning</ListItemText>
                                <ListItemText>BERT</ListItemText>
                                <ListItemText>Traning objective의 변화</ListItemText>
                            </List>
                        </Collapse>

                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(10)}>{isOpen[10] ? <ArrowDropDown/> : <ArrowRight/>}반드시 읽어야 하는 논문</Typography>
                        <Collapse in={isOpen[10]}>
                            <Typography className={classes.articleBody} variant="body1">앞서 언급한 자연어처리의 흐름을 따라가며 공부할 때 같이 읽으면 좋습니다. </Typography>
                            {/* <Table>
                                Papers
                            </Table> */}
                            <Typography className={classes.articleBody} variant="body1">자연어처리 논문을 찾을 때는 메이저 국제 학회에 퍼블리싱된 논문을 훑어보면 됩니다. 다음은 제가 참고한 학회 리스트입니다.</Typography>
                            {/* <Table>
                                Venue
                            </Table> */}
                        </Collapse>
                    </Container>
                </Collapse>
                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(3)}>{isOpen[3] ? <ArrowDropDown/> : <ArrowRight/>}프로젝트 하는 방법</Typography>
                <Collapse in={isOpen[3]}>
                    <Container>
                        <Typography className={classes.articleBody} variant="body1">프로젝트는 가장 간단한 것부터 시작하세요. 어려운 주제, 어려운 데이터로 시작하면 주목할만한 성과를 내기 어려울 뿐더러 쉽게 싫증을 느끼게 됩니다. 구글에 검색했을 때 이미 많은 사람들이 시도한 재료를 가지고 첫 프로젝트를 시작하는게 좋습니다. 다음 표에 자연어처리 각 분야에서 널리 알려진 데이터 셋을 정리했습니다.</Typography>
                        {/* <Table>

                        </Table> */}
                        <Typography className={classes.articleBody} variant="body1">이 중에서 제가 추천하는 데이터는 네이버 영화 리뷰 데이터입니다. Github에 찾아보시면 이 데이터를 사용한 레포지토리가 매우 많아서 참고하기 좋습니다. 또한 새로운 한국어 훈련 모델이 나올때마다 NSMC 데이터로 성능 비교를 하므로 내가 한 프로젝트가 어느 정도 성능을 보이는지 객관적인 평가가 가능합니다. 이때 반드시 <strong>Github에 commit을 하며 프로젝트를 진행</strong>해야 합니다. Github 사용법은 아래에 정리했으니 참고하세요.</Typography>
                        <Typography className={classes.articleBody} variant="body1">쉬운 프로젝트로 감을 익힌 후에는 내가 관심 있는 세부 분야를 찾아야 합니다. 그리고 해당 분야의 문제점은 무엇인지, 연구자들이 이를 해결하기 위하여 어떤 노력을 하고 있는지 논문을 살펴보아야 합니다. 최신 논문, 피인용 수가 많은 논문, 최우수 논문 등 여러가지 기준을 놓고 논문을 찾으세요. 그리고 논문에서 말하는 바를 스스로 구현해보세요. 꼭 논문이 아니더라도 구글에 검색하여 나오는 정보를 적용하는 것도 중요합니다.</Typography>
                        <Typography className={classes.articleBody} variant="body1">저의 예시를 들어보겠습니다. 저는 연구실에서 Classification과 Machine Translation에 관련된 일을 했습니다. 기업이 아닌 이상 딥러닝에서 가장 큰 문제는 부족한 데이터와 학습 자원일 수밖에 없습니다. 양질의 데이터가 너무 적고, 학습할 서버의 용량도 적습니다. 그래서 저는 먼저 Data augmentation 관련 논문을 많이 읽었습니다. 그 중에서 제가 이해할 수 있고, 논문 코드가 공개된 것을 우선으로 선정하여 구현하였습니다. 또한 학습 자원을 최대한 활용하기 위해 Multi-GPU 학습 방법을 찾아 적용하였습니다.</Typography>
                        
                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(11)}>{isOpen[11] ? <ArrowDropDown/> : <ArrowRight/>}Github 활용 방법</Typography>
                        <Collapse in={isOpen[11]}>
                            <Typography className={classes.articleBody} variant="body1">Git 사용 여부가 취업 과정에서 중요하게 작용했던 것 같습니다. 팀 프로젝트를 진행했다면 반드시 협업 과정을 남겨 보여주는 것이 좋고, 개인 프로젝트라도 issue 중심으로 커밋을 기록하면 좋습니다. 아래는 제가 git을 처음 이용할 때 참고했던 블로그들입니다. </Typography>
                            <Link href={'https://www.huskyhoochu.com/issue-based-version-control-201/'}>https://www.huskyhoochu.com/issue-based-version-control-201/</Link><br/>
                            <Link href={'https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html'}>https://gmlwjd9405.github.io/2018/05/11/types-of-git-branch.html</Link><br/>
                            <Link href={'https://gmlwjd9405.github.io/2018/05/12/how-to-collaborate-on-GitHub-3.html'}>https://gmlwjd9405.github.io/2018/05/12/how-to-collaborate-on-GitHub-3.html</Link><br/>
                            <Link href={'https://blog.ull.im/engineering/2019/03/10/logs-on-git.html'}>https://blog.ull.im/engineering/2019/03/10/logs-on-git.html</Link><br/>
                            
                            <Typography className={classes.articleBody} variant="body1">저는 gitflow workflow를 표준으로 삼아 프로젝트를 관리하였습니다. master branch와 dev branch를 분리하고, issue 중심으로 dev에서 branch를 딴 후 merge하고, release 브랜치를 만들어 버전관리를 했습니다.</Typography>
                            <Typography className={classes.articleBody} variant="body1">서류과정에서 github 링크를 제출하였고, 특정 코드를 왜 그렇게 작성하였는지, 면접 전 살펴보았을 때 어느 정도 수준인 것 같은데 혹시 이 정도의 개발도 가능한지 등 관련 질문을 많이 받았습니다. 입사해서도 보니 git 관리 능력은 필수인 것 같습니다. </Typography>
                        </Collapse>

                        <Typography className={classes.articleSectionTitle} variant="h6" onClick={() => handleClick(12)}>{isOpen[12] ? <ArrowDropDown/> : <ArrowRight/>}Pytorch 공부</Typography>
                        <Collapse in={isOpen[12]}>
                            <Typography className={classes.articleBody} variant="body1">Pytorch 길 예정</Typography>
                        </Collapse>
                    </Container>
                </Collapse>
                
                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(4)}>{isOpen[4] ? <ArrowDropDown/> : <ArrowRight/>}선형대수 공부하는 방법</Typography>
                <Collapse in={isOpen[4]}>
                    <Container>
                        <Typography className={classes.articleBody} variant="body1">저는 수학과의 선형대수학 강의로 처음 공부했습니다. 그런데 시간이 부족해서 뒷부분에 특이값 분해 등의 내용을 배우지 못해서 따로 더 공부했습니다. 학교에서 Gilbert Strang 교수님의 Introduction to Linear Algebra 교재로 공부했고, 따로 공부할 때도 해당 강의를 먼저 들었습니다. 강의는 아래 링크에서 확인할 수 있습니다. </Typography>
                        <Link href={'https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/video-lectures/'}>강의</Link>
                        <Typography className={classes.articleBody} variant="body1">David C. Lay 교수님의 Linear Algebra and its applications 교재는 위의 교재보다 좀 더 응용 문제가 많아서 문제를 풀어보기에 좋습니다. 그리고 동치인 statement들(예를 들어 invertible matrix에 대해)을 모아서 제시해줘서 더 직관적으로 생각할 수 있었습니다. 위 강의를 들으며 개념을 익히고 이 교재에 있는 문제를 푸는 식으로 공부해보세요.</Typography>
                        <Link href={'https://math.berkeley.edu/~yonah/files/Linear%20Algebra.pdf'}>교재</Link>
                        
                        
                    </Container>
                </Collapse>

                <Typography className={classes.articleSectionTitle} variant="h5" onClick={() => handleClick(5)}>{isOpen[5] ? <ArrowDropDown/> : <ArrowRight/>}논문 정리하는 방법</Typography>
                <Collapse in={isOpen[5]}>
                    <Typography className={classes.articleBody} variant="body1">딥러닝을 공부하다보면 대학원생이 아니더라도 논문을 많이 읽게 됩니다. 읽은 논문을 정리하는 습관을 가지면 후에 큰 도움이 됩니다. 논문 정리글을 쓰는 것이 가장 좋지만 여의치 않은 경우 표를 만들어서 간단하게 정리해도 괜찮습니다. 저는 구글 스프레드시트를 이용했는데, 노션 등 자신이 편한 툴을 이용해서 작성해보세요.</Typography>
                    {/* <Table>
                        Paper review
                    </Table> */}
                </Collapse>
            </Container>
        </div>
    )
}

export default withRouter(JaeyoonArticle)